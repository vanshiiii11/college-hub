// @ts-nocheck
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const saved = await prisma.savedCollege.findMany({ where: { userId: user.id }, include: { college: true } })
  return NextResponse.json(saved.map(s => s.college))
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { collegeId } = await req.json()
  try {
    await prisma.savedCollege.create({ data: { userId: user.id, collegeId } })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Already saved' }, { status: 400 }) }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { collegeId } = await req.json()
  await prisma.savedCollege.deleteMany({ where: { userId: user.id, collegeId } })
  return NextResponse.json({ success: true })
}