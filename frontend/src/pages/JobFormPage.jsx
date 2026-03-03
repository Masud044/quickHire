import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { HiArrowLeft, HiPlus, HiX } from 'react-icons/hi'
import { jobsApi } from '../utils/api'
import { CATEGORIES, JOB_TYPES } from '../utils/constants'
import toast from 'react-hot-toast'

export default function JobFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [requirements, setRequirements] = useState([''])
  const [responsibilities, setResponsibilities] = useState([''])
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    if (isEdit) {
      const fetchJob = async () => {
        setLoading(true)
        try {
          const res = await jobsApi.getById(id)
          const job = res.data.data
          reset({
            title: job.title, company: job.company, location: job.location,
            category: job.category, type: job.type, salary: job.salary,
            description: job.description, featured: job.featured
          })
          if (job.requirements?.length) setRequirements(job.requirements)
          if (job.responsibilities?.length) setResponsibilities(job.responsibilities)
        } catch {
          toast.error('Failed to load job')
          navigate('/admin')
        } finally {
          setLoading(false)
        }
      }
      fetchJob()
    }
  }, [id])

  const addItem = (setter) => setter(prev => [...prev, ''])
  const removeItem = (setter, i) => setter(prev => prev.filter((_, idx) => idx !== i))
  const updateItem = (setter, i, val) => setter(prev => prev.map((v, idx) => idx === i ? val : v))

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        requirements: requirements.filter(r => r.trim()),
        responsibilities: responsibilities.filter(r => r.trim()),
        featured: data.featured === true || data.featured === 'true'
      }
      if (isEdit) {
        await jobsApi.update(id, payload)
        toast.success('Job updated successfully!')
      } else {
        await jobsApi.create(payload)
        toast.success('Job posted successfully!')
      }
      navigate('/admin')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to save job'
      toast.error(msg)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-gray-400">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-blue mb-6 group">
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Admin
        </Link>

        <div className="card p-8">
          <h1 className="font-display font-bold text-2xl text-brand-dark mb-1">
            {isEdit ? 'Edit Job' : 'Post a New Job'}
          </h1>
          <p className="text-gray-400 text-sm mb-8">Fill in the details below to {isEdit ? 'update' : 'create'} a job listing</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title *</label>
                <input {...register('title', { required: 'Required' })}
                  placeholder="e.g. Senior UI Designer"
                  className={`input ${errors.title ? 'border-red-400' : ''}`} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name *</label>
                <input {...register('company', { required: 'Required' })}
                  placeholder="e.g. Acme Corp"
                  className={`input ${errors.company ? 'border-red-400' : ''}`} />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                <input {...register('location', { required: 'Required' })}
                  placeholder="e.g. New York, NY or Remote"
                  className={`input ${errors.location ? 'border-red-400' : ''}`} />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Salary (optional)</label>
                <input {...register('salary')}
                  placeholder="e.g. $80k–$100k/yr"
                  className="input" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                <select {...register('category', { required: 'Required' })}
                  className={`input ${errors.category ? 'border-red-400' : ''}`}>
                  <option value="">Select category...</option>
                  {CATEGORIES.map(({ name }) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Type</label>
                <select {...register('type')} className="input">
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Description *</label>
              <textarea {...register('description', { required: 'Required', minLength: { value: 50, message: 'Min 50 chars' } })}
                rows={6}
                placeholder="Describe the role, team, and company..."
                className={`input resize-none ${errors.description ? 'border-red-400' : ''}`} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
              <div className="space-y-2">
                {requirements.map((req, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={req}
                      onChange={e => updateItem(setRequirements, i, e.target.value)}
                      placeholder={`Requirement ${i + 1}`}
                      className="input text-sm"
                    />
                    {requirements.length > 1 && (
                      <button type="button" onClick={() => removeItem(setRequirements, i)}
                        className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0">
                        <HiX />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addItem(setRequirements)}
                className="mt-2 flex items-center gap-1.5 text-sm text-brand-blue hover:underline font-medium">
                <HiPlus /> Add requirement
              </button>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Responsibilities</label>
              <div className="space-y-2">
                {responsibilities.map((res, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={res}
                      onChange={e => updateItem(setResponsibilities, i, e.target.value)}
                      placeholder={`Responsibility ${i + 1}`}
                      className="input text-sm"
                    />
                    {responsibilities.length > 1 && (
                      <button type="button" onClick={() => removeItem(setResponsibilities, i)}
                        className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0">
                        <HiX />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addItem(setResponsibilities)}
                className="mt-2 flex items-center gap-1.5 text-sm text-brand-blue hover:underline font-medium">
                <HiPlus /> Add responsibility
              </button>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-4 h-4 accent-brand-blue"
              />
              <div>
                <label htmlFor="featured" className="text-sm font-semibold text-brand-dark cursor-pointer">
                  Featured Job ⭐
                </label>
                <p className="text-xs text-gray-400">Featured jobs appear at the top of search results</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link to="/admin" className="btn-outline flex-1 text-center">Cancel</Link>
              <button type="submit" disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Job' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
