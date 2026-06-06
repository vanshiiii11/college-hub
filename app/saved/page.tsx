'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Saved() {
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/saved').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setColleges(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeHub</Link>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Saved Colleges</h2>
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-4">No saved colleges yet</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Browse Colleges</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <div key={college.id} className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-lg mb-2">{college.name}</h3>
                <p className="text-gray-500 text-sm mb-1">📍 {college.location}, {college.state}</p>
                <p className="text-blue-600 font-semibold mb-4">₹{college.fees.toLocaleString()}/year</p>
                <Link href={`/college/${college.id}`} className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 text-sm">View Details</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}