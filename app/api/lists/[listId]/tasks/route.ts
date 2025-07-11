import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params
  try {
    if (!listId) {
      return NextResponse.json({ error: 'listId is required' }, { status: 400 })
    }
    const tasks = await prisma.task.findMany({
      where: { listId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tasks)
  } catch (error) {
    console.log("Error server in GET list's tasks", error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
