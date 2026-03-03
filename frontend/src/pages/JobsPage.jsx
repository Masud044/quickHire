import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/jobs/SearchBar'
import JobCard from '../components/jobs/JobCard'
import FilterSidebar from '../components/jobs/FilterSidebar'
import Spinner from '../components/common/Spinner'
import { jobsApi } from '../utils/api'
import { HiFilter, HiX } from 'react-icons/hi'

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    page: 1
  })

  const fetchJobs = useCallback(async (f) => {
    setLoading(true)
    try {
      const params = {}
      if (f.search) params.search = f.search
      if (f.category) params.category = f.category
      if (f.type) params.type = f.type
      if (f.location) params.location = f.location
      params.page = f.page
      params.limit = 9
      const res = await jobsApi.getAll(params)
      setJobs(res.data.data)
      setPagination(res.data.pagination)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs(filters)
    // Update URL params
    const params = {}
    if (filters.search) params.search = filters.search
    if (filters.category) params.category = filters.category
    if (filters.type) params.type = filters.type
    if (filters.location) params.location = filters.location
    setSearchParams(params)
  }, [filters])

  const handleSearch = ({ search, location }) => {
    setFilters(f => ({ ...f, search, location, page: 1 }))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(f => ({ ...f, ...newFilters, page: 1 }))
    setShowMobileFilter(false)
  }

  const activeFiltersCount = [filters.category, filters.type].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top search bar */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={handleSearch} compact />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-brand-dark">
              {filters.search ? `Results for "${filters.search}"` : 'All Jobs'}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? 'Loading...' : `${pagination.total || 0} jobs found`}
              {filters.category && ` in ${filters.category}`}
            </p>
          </div>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="lg:hidden flex items-center gap-2 btn-outline text-sm py-2"
          >
            <HiFilter />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-brand-blue text-white rounded-full text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Job grid */}
          <div className="lg:col-span-3">
            {/* Active filters chips */}
            {(filters.category || filters.type) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.category && (
                  <button
                    onClick={() => setFilters(f => ({ ...f, category: '', page: 1 }))}
                    className="flex items-center gap-1.5 bg-primary-50 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {filters.category} <HiX />
                  </button>
                )}
                {filters.type && (
                  <button
                    onClick={() => setFilters(f => ({ ...f, type: '', page: 1 }))}
                    className="flex items-center gap-1.5 bg-primary-50 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {filters.type} <HiX />
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <Spinner text="Searching jobs..." />
            ) : jobs.length === 0 ? (
              <div className="card p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-xl text-brand-dark mb-2">No jobs found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                <button
                  onClick={() => setFilters({ search: '', category: '', type: '', location: '', page: 1 })}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  {jobs.map(job => <JobCard key={job._id} job={job} />)}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      disabled={filters.page <= 1}
                      onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
                      className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).slice(
                      Math.max(0, filters.page - 2), filters.page + 2
                    ).map(p => (
                      <button
                        key={p}
                        onClick={() => setFilters(f => ({ ...f, page: p }))}
                        className={`w-10 h-10 text-sm font-medium rounded-xl transition-colors ${
                          p === filters.page ? 'bg-brand-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      disabled={filters.page >= pagination.pages}
                      onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                      className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xl">Filters</h3>
              <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <HiX className="text-lg" />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>
        </div>
      )}
    </div>
  )
}
