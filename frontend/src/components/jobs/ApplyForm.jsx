import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiX, HiCheckCircle, HiUser, HiMail, HiLink, HiDocumentText } from 'react-icons/hi'
import { applicationsApi } from '../../utils/api'
import toast from 'react-hot-toast'

export default function ApplyForm({ job, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await applicationsApi.submit({ ...data, job: job._id })
      setSubmitted(true)
      toast.success('Application submitted successfully!')
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit'
      toast.error(msg)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-display font-bold text-brand-dark text-xl">Apply Now</h2>
            <p className="text-sm text-gray-500 mt-0.5">{job.title} · {job.company}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <HiX className="text-lg text-gray-500" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCheckCircle className="text-4xl text-green-500" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-dark mb-2">Application Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">We'll review your application and get back to you soon.</p>
            <button onClick={onClose} className="btn-primary">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="John Doe"
                  className={`input pl-10 ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
                  })}
                  placeholder="john@example.com"
                  type="email"
                  className={`input pl-10 ${errors.email ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Resume Link</label>
              <div className="relative">
                <HiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('resumeLink', {
                    required: 'Resume link is required',
                    pattern: { value: /^https?:\/\/.+/, message: 'Enter a valid URL (https://...)' }
                  })}
                  placeholder="https://drive.google.com/your-resume"
                  className={`input pl-10 ${errors.resumeLink ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.resumeLink && <p className="text-red-500 text-xs mt-1">{errors.resumeLink.message}</p>}
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Note</label>
              <div className="relative">
                <HiDocumentText className="absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  {...register('coverNote', {
                    required: 'Cover note is required',
                    minLength: { value: 50, message: 'At least 50 characters required' }
                  })}
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={4}
                  className={`input pl-10 resize-none ${errors.coverNote ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.coverNote && <p className="text-red-500 text-xs mt-1">{errors.coverNote.message}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
