import { CATEGORIES, JOB_TYPES } from '../../utils/constants'

export default function FilterSidebar({ filters, onChange }) {
  const handleCategory = (cat) => {
    onChange({ ...filters, category: filters.category === cat ? '' : cat })
  }
  const handleType = (type) => {
    onChange({ ...filters, type: filters.type === type ? '' : type })
  }
  const handleClear = () => onChange({ search: '', category: '', type: '', location: '' })

  const hasFilters = filters.category || filters.type

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-brand-dark">Filters</h3>
        {hasFilters && (
          <button onClick={handleClear} className="text-xs text-brand-blue hover:underline font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1.5">
          {CATEGORIES.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleCategory(name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                filters.category === name
                  ? 'bg-primary-50 text-brand-blue font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span className="flex-1">{name}</span>
              {filters.category === name && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Job Type</h4>
        <div className="space-y-1.5">
          {JOB_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleType(type)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                filters.type === type
                  ? 'bg-primary-50 text-brand-blue font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-3 h-3 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                filters.type === type ? 'bg-brand-blue border-brand-blue' : 'border-gray-300'
              }`}>
                {filters.type === type && <span className="text-white text-xs leading-none">✓</span>}
              </span>
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
