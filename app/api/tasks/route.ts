import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, description = '', listId, userId } = body
    if (!text || !listId || !userId) {
      return NextResponse.json({ error: 'text, listId and userId are required' }, { status: 400 })
    }
    const task = await prisma.task.create({
      data: {
        text,
        description,
        done: false,
        listId,
        userId
      }
    })
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.log('Error server in POST task', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
