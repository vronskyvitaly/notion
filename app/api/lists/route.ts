import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, userId } = body
    if (!name || !userId) {
      return NextResponse.json({ error: 'name and userId are required' }, { status: 400 })
    }
    const list = await prisma.todoList.create({
      data: { name, userId }
    })
    return NextResponse.json(list, { status: 201 })
  } catch (error) {
    console.log('Error server in POST list', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const lists = await prisma.todoList.findMany({
      where: { userId }
    })
    return NextResponse.json(lists)
  } catch (error) {
    console.log('Error server in GET lists', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
