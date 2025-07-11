import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  try {
    const body = await req.json()
    const { text, description, done } = body
    if (text === undefined && description === undefined && done === undefined) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(text !== undefined ? { text } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(done !== undefined ? { done } : {})
      }
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.log('Error server in PATCH update task', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  try {
    if (!taskId) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 })
    }
    await prisma.task.delete({ where: { id: taskId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('Error server in DELETE task', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
