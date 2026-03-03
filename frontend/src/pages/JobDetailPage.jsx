import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiArrowLeft, HiLocationMarker, HiClock, HiBriefcase, HiCurrencyDollar, HiShare, HiBookmark } from 'react-icons/hi'
import ApplyForm from '../components/jobs/ApplyForm'
import Spinner from '../components/common/Spinner'
import { jobsApi } from '../utils/api'
import { TYPE_COLORS, formatDate, getCategoryStyle } from '../utils/constants'

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showApply, setShowApply] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await jobsApi.getById(id)
        setJob(res.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Spinner text="Loading job details..." />
    </div>
  )

  if (!job) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-2">Job not found</h2>
        <Link to="/jobs" className="btn-primary">Browse all jobs</Link>
      </div>
    </div>
  )

  const cat = getCategoryStyle(job.category)
  const typeColor = TYPE_COLORS[job.type] || 'badge-gray'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-blue transition-colors mb-6 group">
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header card */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${cat.color} flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h1 className="font-display font-bold text-2xl text-brand-dark mb-1">{job.title}</h1>
                  <p className="text-gray-500 font-medium mb-3">{job.company}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={typeColor}>{job.type}</span>
                    <span className="badge bg-gray-100 text-gray-600">{cat.icon} {job.category}</span>
                    {job.featured && <span className="badge bg-primary-50 text-primary-500">⭐ Featured</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-400">
                    <HiShare />
                  </button>
                  <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-400">
                    <HiBookmark />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiLocationMarker className="text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="font-medium text-gray-700">{job.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiBriefcase className="text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Job Type</div>
                    <div className="font-medium text-gray-700">{job.type}</div>
                  </div>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <HiCurrencyDollar className="text-brand-blue flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">Salary</div>
                      <div className="font-medium text-gray-700">{job.salary}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiClock className="text-brand-blue flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Posted</div>
                    <div className="font-medium text-gray-700">{formatDate(job.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-xl text-brand-dark mb-4">Job Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-xl text-brand-dark mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-5 h-5 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-brand-blue text-xs">✓</span>
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display font-bold text-xl text-brand-dark mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-brand-blue text-xs">→</span>
                      </span>
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Apply sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-display font-bold text-xl text-brand-dark mb-2">Ready to Apply?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Join {job.company} and take the next step in your career journey.
              </p>
              <button onClick={() => setShowApply(true)} className="btn-primary w-full text-center">
                Apply Now →
              </button>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <HiBriefcase className="text-gray-300" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiLocationMarker className="text-gray-300" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <HiCurrencyDollar className="text-gray-300" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <HiClock className="text-gray-300" />
                    <span>Posted {formatDate(job.createdAt)}</span>
                  </div>
                </div>
              </div>
              <Link to="/jobs" className="btn-outline w-full text-center block mt-4 text-sm py-2.5">
                ← See similar jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showApply && <ApplyForm job={job} onClose={() => setShowApply(false)} />}
    </div>
  )
}
