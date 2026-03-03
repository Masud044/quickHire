import { useState } from 'react'
import { HiSearch, HiLocationMarker, HiAdjustments } from 'react-icons/hi'

export default function SearchBar({ onSearch, compact = false }) {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ search: keyword.trim(), location: location.trim() })
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search jobs..."
            className="input pl-10 text-sm"
          />
        </div>
        <button type="submit" className="btn-primary py-2 px-4 text-sm whitespace-nowrap">
          Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Job title, keyword, company..."
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 border-0"
        />
      </div>

      <div className="h-px sm:h-auto sm:w-px bg-gray-100" />

      <div className="relative flex-1">
        <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 border-0"
        />
      </div>

      <button type="submit" className="btn-primary py-3.5 px-8 whitespace-nowrap text-sm font-bold">
        Search Jobs
      </button>
    </form>
  )
}
