import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowRight, HiTrendingUp, HiBriefcase, HiUsers } from 'react-icons/hi'
import SearchBar from '../components/jobs/SearchBar'
import JobCard from '../components/jobs/JobCard'
import Spinner from '../components/common/Spinner'
import { jobsApi } from '../utils/api'
import { CATEGORIES } from '../utils/constants'

const PARTNERS = ['salesforce', 'intel', 'tesla', 'amd', 'tableau']
const STATS = [
  { icon: HiBriefcase, label: 'Live Jobs', value: '5,000+' },
  { icon: HiUsers, label: 'Companies', value: '1,200+' },
  { icon: HiTrendingUp, label: 'Applications', value: '84,000+' }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [latestJobs, setLatestJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [featured, latest] = await Promise.all([
          jobsApi.getAll({ featured: true, limit: 4 }),
          jobsApi.getAll({ limit: 6 })
        ])
        setFeaturedJobs(featured.data.data)
        setLatestJobs(latest.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleSearch = ({ search, location }) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (location) params.set('location', location)
    navigate(`/jobs?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 pt-16 pb-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 bg-primary-50 text-brand-blue text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                #1 Job Board Platform
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-tight mb-6">
                Discover more than{' '}
                <span className="text-brand-blue relative">
                  5000+
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 C50 2, 150 2, 198 6" stroke="#3D3BF3" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
                  </svg>
                </span>{' '}
                Jobs
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Great platform for job seekers that looking for new career heights and passionate about startups.
              </p>

              <SearchBar onSearch={handleSearch} />

              <div className="mt-5 text-xs text-gray-400">
                <span className="font-medium text-gray-600">Trending: </span>
                {['UI Designer', 'Frontend Dev', 'Product Manager', 'Data Analyst'].map((t, i) => (
                  <button key={t} onClick={() => handleSearch({ search: t, location: '' })}
                    className="text-gray-500 hover:text-brand-blue transition-colors mx-1">
                    {t}{i < 3 ? ',' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-purple-600 rounded-3xl opacity-10" />
                <div className="absolute inset-4 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">⚡</div>
                    <div className="font-display font-bold text-3xl text-brand-dark">Quick<span className="text-brand-blue">Hire</span></div>
                    <p className="text-gray-400 text-sm mt-2">Find jobs faster</p>
                    <div className="mt-6 space-y-2">
                      {STATS.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-2"><Icon className="text-brand-blue" />{label}</span>
                          <span className="font-bold text-brand-dark">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="mt-14">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-6 text-center">Trusted by top companies</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['Salesforce', 'Intel', 'TESLA', 'AMD', 'Tableau'].map(p => (
                <span key={p} className="font-display font-bold text-gray-400 text-lg tracking-wide">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Explore by <span className="text-brand-blue">category</span></h2>
              <p className="text-gray-400 text-sm mt-1">Browse jobs by your preferred industry</p>
            </div>
            <Link to="/jobs" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-blue hover:gap-2 transition-all">
              Show all <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map(({ name, icon, color }) => (
              <button
                key={name}
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(name)}`)}
                className="card p-5 text-left group hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>
                  {icon}
                </div>
                <h3 className="font-display font-semibold text-sm text-brand-dark group-hover:text-brand-blue transition-colors">{name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">View jobs →</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-display font-bold text-3xl text-white mb-2">Start posting jobs today</h2>
              <p className="text-blue-200 text-sm">Start posting jobs for only $10/mo — reach thousands of candidates</p>
            </div>
            <Link to="/admin/new" className="bg-white text-brand-blue font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap">
              Sign Up For Free
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Featured <span className="text-brand-blue">Jobs</span></h2>
            <Link to="/jobs?featured=true" className="text-sm font-semibold text-brand-blue flex items-center gap-1 hover:gap-2 transition-all">
              Show all <HiArrowRight />
            </Link>
          </div>
          {loading ? <Spinner text="Loading jobs..." /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {featuredJobs.length > 0 ? featuredJobs.map(job => (
                <JobCard key={job._id} job={job} featured />
              )) : (
                <div className="col-span-4 text-center py-12">
                  <p className="text-gray-400">No featured jobs yet.</p>
                  <Link to="/admin/new" className="text-brand-blue text-sm font-semibold mt-2 inline-block hover:underline">Post a job →</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Latest Jobs <span className="text-green-500 text-base font-semibold ml-2">open</span></h2>
            <Link to="/jobs" className="text-sm font-semibold text-brand-blue flex items-center gap-1 hover:gap-2 transition-all">
              Show all <HiArrowRight />
            </Link>
          </div>
          {loading ? <Spinner /> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
          {!loading && (
            <div className="text-center mt-8">
              <Link to="/jobs" className="btn-outline inline-flex items-center gap-2">
                Browse All Jobs <HiArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
