'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Compare() {
  const [colleges, setColleges] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/colleges').then(r => r.json()).then(setColleges)
  }, [])

  const addCollege = (college: any) => {
    if (selected.length < 3 && !selected.find(c => c.id === college.id)) {
      setSelected([...selected, college])
    }
  }

  const removeCollege = (id: string) => setSelected(selected.filter(c => c.id !== id))

  const filtered = colleges.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeHub</Link>
        <div className="flex gap-4">
          <Link href="/saved" className="text-gray-600 hover:text-blue-600">Saved</Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-2">Compare Colleges</h2>
        <p className="text-gray-500 mb-6">Select up to 3 colleges to compare</p>
        <input
          className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search colleges to add..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mb-6">
          {filtered.slice(0, 8).map(college => (
            <button key={college.id} onClick={() => addCollege(college)}
              className="bg-white border rounded-lg px-4 py-2 hover:bg-blue-50 hover:border-blue-500 text-sm">
              + {college.name}
            </button>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left text-gray-500">Feature</th>
                  {selected.map(c => (
                    <th key={c.id} className="p-4 text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{c.name}</span>
                        <button onClick={() => removeCollege(c.id)} className="text-red-400 hover:text-red-600 ml-2">✕</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold text-gray-600">Location</td>
                  {selected.map(c => <td key={c.id} className="p-4">{c.location}, {c.state}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Rating</td>
                  {selected.map(c => <td key={c.id} className="p-4 text-yellow-500 font-bold">⭐ {c.rating}</td>)}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold text-gray-600">Annual Fees</td>
                  {selected.map(c => <td key={c.id} className="p-4 text-blue-600 font-semibold">₹{c.fees.toLocaleString()}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Avg Package</td>
                  {selected.map(c => <td key={c.id} className="p-4">₹{((c.placements as any).avgPackage/100000).toFixed(1)}L</td>)}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold text-gray-600">Highest Package</td>
                  {selected.map(c => <td key={c.id} className="p-4">₹{((c.placements as any).highestPackage/100000).toFixed(1)}L</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Placement Rate</td>
                  {selected.map(c => <td key={c.id} className="p-4 text-green-600 font-semibold">{(c.placements as any).placementRate}%</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-600">Courses</td>
                  {selected.map(c => <td key={c.id} className="p-4 text-sm">{c.courses.join(', ')}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {selected.length === 0 && (
          <div className="text-center py-20 text-gray-400">Add colleges above to start comparing</div>
        )}
      </div>
    </main>
  )
}