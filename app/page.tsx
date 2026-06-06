'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  const [colleges, setColleges] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/colleges?search=${search}&state=${state}`)
      .then(r => r.json())
      .then(data => { setColleges(data); setLoading(false) })
  }, [search, state])

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CollegeHub</h1>
        <div className="flex gap-4 items-center">
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/saved" className="text-gray-600 hover:text-blue-600">Saved</Link>
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-semibold">Hi, {session.user?.name}</span>
              <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
          )}
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-2">Find Your Dream College</h2>
        <p className="text-center text-gray-500 mb-8">Search from top colleges across India</p>
        <div className="flex gap-4 mb-8">
          <input
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search colleges..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={state}
            onChange={e => setState(e.target.value)}
          >
            <option value="">All States</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading colleges...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <div key={college.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">{college.name}</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold ml-2">⭐ {college.rating}</span>
                </div>
                <p className="text-gray-500 text-sm mb-1">📍 {college.location}, {college.state}</p>
                <p className="text-blue-600 font-semibold mb-4">₹{college.fees.toLocaleString()}/year</p>
                <div className="flex gap-2">
                  <Link href={`/college/${college.id}`} className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 text-sm">View Details</Link>
                  <Link href={`/compare?id=${college.id}`} className="flex-1 border border-blue-600 text-blue-600 text-center py-2 rounded-lg hover:bg-blue-50 text-sm">Compare</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}