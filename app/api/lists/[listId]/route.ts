import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params
  try {
    const body = await request.json()
    const { name } = body
    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }
    const updated = await prisma.todoList.update({
      where: { id: listId },
      data: { name }
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.log('Error server in PATCH update list name', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
