import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiPlus, HiTrash, HiPencil, HiBriefcase, HiUsers, HiStar, HiChartBar, HiEye } from 'react-icons/hi'
import Spinner from '../components/common/Spinner'
import { jobsApi, applicationsApi } from '../utils/api'
import { formatDate, getCategoryStyle, TYPE_COLORS } from '../utils/constants'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('jobs')
  const [deleting, setDeleting] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [jobsRes, appsRes] = await Promise.all([
        jobsApi.getAll({ limit: 50 }),
        applicationsApi.getAll({ limit: 50 })
      ])
      setJobs(jobsRes.data.data)
      setApplications(appsRes.data.data)
      setStats({
        total: jobsRes.data.pagination.total,
        featured: jobsRes.data.data.filter(j => j.featured).length,
        applications: appsRes.data.pagination.total
      })
    } catch (e) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    setDeleting(id)
    try {
      await jobsApi.delete(id)
      setJobs(jobs.filter(j => j._id !== id))
      toast.success('Job deleted successfully')
    } catch (e) {
      toast.error('Failed to delete job')
    } finally {
      setDeleting(null)
    }
  }

  const statCards = [
    { label: 'Total Jobs', value: stats?.total || 0, icon: HiBriefcase, color: 'bg-blue-50 text-blue-600' },
    { label: 'Featured Jobs', value: stats?.featured || 0, icon: HiStar, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Applications', value: stats?.applications || 0, icon: HiUsers, color: 'bg-green-50 text-green-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-brand-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl mb-1">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your job listings and applications</p>
            </div>
            <Link to="/admin/new" className="btn-primary flex items-center gap-2 text-sm">
              <HiPlus className="text-base" />
              Post New Job
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                  <Icon className="text-xl" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-brand-dark">{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: 'jobs', label: 'Job Listings', count: jobs.length },
            { key: 'applications', label: 'Applications', count: applications.length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                activeTab === key ? 'bg-primary-50 text-brand-blue' : 'bg-gray-200 text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {loading ? <Spinner text="Loading data..." /> : (
          <>
            {/* Jobs Table */}
            {activeTab === 'jobs' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4">Job</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden sm:table-cell">Category</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden md:table-cell">Type</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden lg:table-cell">Posted</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {jobs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                            No jobs yet. <Link to="/admin/new" className="text-brand-blue hover:underline">Post your first job →</Link>
                          </td>
                        </tr>
                      ) : jobs.map(job => {
                        const cat = getCategoryStyle(job.category)
                        const typeColor = TYPE_COLORS[job.type] || 'badge-gray'
                        return (
                          <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm ${cat.color}`}>
                                  {cat.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-sm text-brand-dark">{job.title}</div>
                                  <div className="text-xs text-gray-400">{job.company} · {job.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 hidden sm:table-cell">
                              <span className="text-xs text-gray-500">{job.category}</span>
                            </td>
                            <td className="px-5 py-4 hidden md:table-cell">
                              <span className={typeColor}>{job.type}</span>
                            </td>
                            <td className="px-5 py-4 hidden lg:table-cell">
                              <span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/jobs/${job._id}`}
                                  className="p-2 text-gray-400 hover:text-brand-blue hover:bg-primary-50 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <HiEye className="text-sm" />
                                </Link>
                                <Link
                                  to={`/admin/edit/${job._id}`}
                                  className="p-2 text-gray-400 hover:text-brand-blue hover:bg-primary-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <HiPencil className="text-sm" />
                                </Link>
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  disabled={deleting === job._id}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                  title="Delete"
                                >
                                  <HiTrash className="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Applications Table */}
            {activeTab === 'applications' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4">Applicant</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden sm:table-cell">Job Applied</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden md:table-cell">Resume</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4 hidden lg:table-cell">Applied On</th>
                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-5 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {applications.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">No applications yet.</td>
                        </tr>
                      ) : applications.map(app => (
                        <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <div>
                              <div className="font-semibold text-sm text-brand-dark">{app.name}</div>
                              <div className="text-xs text-gray-400">{app.email}</div>
                            </div>
                          </td>
                          <td className="px-5 py-4 hidden sm:table-cell">
                            <div className="text-sm text-gray-600">{app.job?.title}</div>
                            <div className="text-xs text-gray-400">{app.job?.company}</div>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <a href={app.resumeLink} target="_blank" rel="noreferrer"
                              className="text-brand-blue text-xs hover:underline font-medium">
                              View Resume →
                            </a>
                          </td>
                          <td className="px-5 py-4 hidden lg:table-cell">
                            <span className="text-xs text-gray-400">{formatDate(app.createdAt)}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`badge text-xs ${
                              app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                              app.status === 'reviewed' ? 'bg-blue-50 text-blue-600' :
                              app.status === 'shortlisted' ? 'bg-green-50 text-green-600' :
                              'bg-red-50 text-red-500'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
