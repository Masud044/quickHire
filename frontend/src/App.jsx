import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import AdminPage from './pages/AdminPage'
import JobFormPage from './pages/JobFormPage'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/new" element={<JobFormPage />} />
        <Route path="/admin/edit/:id" element={<JobFormPage />} />
        <Route path="*" element={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Page Not Found</h1>
              <a href="/" className="btn-primary inline-block mt-4">Go Home</a>
            </div>
          </div>
        } />
      </Routes>
    </Layout>
  )
}
