import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state') || ''
    const maxFees = parseInt(searchParams.get('maxFees') || '10000000')
    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          { name: { contains: search, mode: 'insensitive' } },
          state ? { state: { equals: state } } : {},
          { fees: { lte: maxFees } },
        ],
      },
      orderBy: { rating: 'desc' },
    })
    return NextResponse.json(colleges)
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}