import { Link } from 'react-router-dom'
import { HiLocationMarker, HiClock, HiBookmark } from 'react-icons/hi'
import { TYPE_COLORS, formatDate, getCategoryStyle } from '../../utils/constants'

export default function JobCard({ job, featured = false }) {
  const typeColor = TYPE_COLORS[job.type] || 'badge-gray'
  const cat = getCategoryStyle(job.category)

  return (
    <Link
      to={`/jobs/${job._id}`}
      className={`card block p-5 group ${featured ? 'border-primary-100' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-bold overflow-hidden ${cat.color}`}>
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
          ) : (
            <span>{cat.icon}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-blue transition-colors text-sm leading-snug truncate">
              {job.title}
            </h3>
            {featured && (
              <span className="flex-shrink-0 badge bg-primary-50 text-primary-500 text-xs">Featured</span>
            )}
          </div>

          <p className="text-xs text-gray-500 font-medium mb-3">{job.company}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className={typeColor}>{job.type}</span>
            <span className="badge bg-gray-50 text-gray-500">
              <span>{cat.icon}</span> {job.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <HiLocationMarker className="text-gray-300" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <HiClock className="text-gray-300" />
              {formatDate(job.createdAt)}
            </span>
          </div>
        </div>

        {/* Salary & Bookmark */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {job.salary && (
            <span className="text-xs font-bold text-brand-blue whitespace-nowrap">{job.salary}</span>
          )}
          <button
            onClick={e => e.preventDefault()}
            className="text-gray-300 hover:text-brand-blue transition-colors p-1"
          >
            <HiBookmark />
          </button>
        </div>
      </div>
    </Link>
  )
}
