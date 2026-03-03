export default function Spinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} border-3 border-gray-200 border-t-brand-blue rounded-full animate-spin`}
        style={{ borderWidth: '3px', borderTopColor: '#3D3BF3' }} />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  )
}
