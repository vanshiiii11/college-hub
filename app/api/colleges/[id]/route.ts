// @ts-nocheck
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: params.id },
      include: { reviews: { include: { user: { select: { name: true } } } } },
    })
    if (!college) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(college)
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}