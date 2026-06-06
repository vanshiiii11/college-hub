// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function CollegePage() {
  const { id } = useParams()
  const [college, setCollege] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
  fetch(`/api/colleges/${id}`)
    .then(r => r.json())
    .then(data => { setCollege(data); setLoading(false) })
  
  // Check if already saved
  fetch('/api/saved')
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data)) {
        const alreadySaved = data.find((c: any) => c.id === id)
        if (alreadySaved) setSaved(true)
      }
    })
}, [id])

  const handleSave = async () => {
  const res = await fetch('/api/saved', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collegeId: id }),
    credentials: 'include',
  })
  if (res.ok) setSaved(true)
  else if (res.status === 401) alert('Please login to save colleges')
  else alert('Error saving college')
}

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
  if (!college) return <div className="min-h-screen flex items-center justify-center text-gray-400">College not found</div>

  const placements = college.placements as any

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeHub</Link>
        <div className="flex gap-4">
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/saved" className="text-gray-600 hover:text-blue-600">Saved</Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Back to listings</Link>
        <div className="bg-white rounded-xl shadow p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{college.name}</h1>
              <p className="text-gray-500">📍 {college.location}, {college.state}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">⭐ {college.rating}</span>
              <button onClick={handleSave} className={`px-4 py-2 rounded-lg text-sm font-semibold ${saved ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                {saved ? '✓ Saved' : '+ Save College'}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600">{college.overview}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Fee Structure</h2>
            <p className="text-3xl font-bold text-blue-600">₹{college.fees.toLocaleString()}</p>
            <p className="text-gray-500">per year</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Courses Offered</h2>
            <div className="flex flex-wrap gap-2">
              {college.courses.map((c: string) => (
                <span key={c} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Placements</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Avg Package</span><span className="font-semibold">₹{(placements.avgPackage/100000).toFixed(1)}L</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Highest Package</span><span className="font-semibold">₹{(placements.highestPackage/100000).toFixed(1)}L</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Placement Rate</span><span className="font-semibold text-green-600">{placements.placementRate}%</span></div>
            </div>
          </div>
        </div>
        {college.reviews.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {college.reviews.map((r: any) => (
              <div key={r.id} className="border-b pb-4 mb-4">
                <div className="flex justify-between"><span className="font-semibold">{r.user.name}</span><span className="text-yellow-500">⭐ {r.rating}</span></div>
                <p className="text-gray-600 mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}