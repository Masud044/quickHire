import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiLightningBolt } from 'react-icons/hi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Find Jobs' },
    { to: '/admin', label: 'Admin' }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <HiLightningBolt className="text-white text-sm" />
            </div>
            <span className="font-display font-bold text-xl text-brand-dark">
              Quick<span className="text-brand-blue">Hire</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-medium text-sm transition-colors hover:text-brand-blue ${
                  location.pathname === to ? 'text-brand-blue' : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/jobs" className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors">
              Browse Jobs
            </Link>
            <Link to="/admin/new" className="btn-primary text-sm py-2 px-4">
              Post a Job
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-gray-100 mt-2 animate-fade-in">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  location.pathname === to
                    ? 'bg-primary-50 text-brand-blue'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link to="/admin/new" onClick={() => setMenuOpen(false)} className="btn-primary text-sm py-2.5 w-full text-center block">
                Post a Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
