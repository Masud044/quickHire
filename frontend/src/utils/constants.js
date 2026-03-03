export const CATEGORIES = [
  { name: 'Design', icon: '🎨', color: 'bg-pink-50 text-pink-600' },
  { name: 'Sales', icon: '📈', color: 'bg-orange-50 text-orange-600' },
  { name: 'Marketing', icon: '📣', color: 'bg-blue-50 text-blue-600' },
  { name: 'Finance', icon: '💰', color: 'bg-green-50 text-green-600' },
  { name: 'Technology', icon: '💻', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Engineering', icon: '⚙️', color: 'bg-gray-100 text-gray-600' },
  { name: 'Business', icon: '🏢', color: 'bg-yellow-50 text-yellow-700' },
  { name: 'Human Resources', icon: '👥', color: 'bg-purple-50 text-purple-600' }
]

export const JOB_TYPES = ['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship']

export const TYPE_COLORS = {
  'Full Time': 'badge-blue',
  'Part Time': 'badge-orange',
  'Remote': 'badge-green',
  'Contract': 'badge-purple',
  'Internship': 'badge-gray'
}

export const COMPANY_LOGOS = {
  default: (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=48&bold=true&rounded=true`
}

export const formatDate = (date) => {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return '1 day ago'
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const getCategoryStyle = (category) => {
  return CATEGORIES.find(c => c.name === category) || { icon: '💼', color: 'bg-gray-100 text-gray-600' }
}
