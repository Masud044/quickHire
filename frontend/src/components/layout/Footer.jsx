import { Link } from 'react-router-dom'
import { HiLightningBolt } from 'react-icons/hi'
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center">
                <HiLightningBolt className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Quick<span className="text-blue-400">Hire</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Great platform for job seekers — find your dream job from thousands of verified listings.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, FaFacebook, FaLinkedin, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-blue transition-colors text-gray-400 hover:text-white">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'About',
              links: ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy']
            },
            {
              title: 'Resources',
              links: ['iOS & Android', 'Watch a Demo', 'Customers', 'API', 'Contact Us']
            },
            {
              title: 'Get Job Notifications',
              isNewsletter: true
            }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-display font-semibold text-white mb-5">{col.title}</h4>
              {col.isNewsletter ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">The latest job news, articles, sent to your inbox weekly.</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="flex-1 px-3 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                    <button className="px-4 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2024 QuickHire. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
