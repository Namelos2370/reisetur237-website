import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { useAnalytics } from './hooks/useAnalytics'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import CertificationsPage from './pages/CertificationsPage'
import PartnershipsPage from './pages/PartnershipsPage'
import BlogPage from './pages/blog/BlogPage'
import ArticlePage from './pages/blog/ArticlePage'
import { ContactPage } from './pages/StubPages'
import AuthPage from './pages/candidate/AuthPage'
import CandidateDashboard from './pages/candidate/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import MentionsLegales from './pages/legal/MentionsLegales'
import PolitiqueConfidentialite from './pages/legal/PolitiqueConfidentialite'
import CGV from './pages/legal/CGV'
import NotFoundPage from './pages/NotFoundPage'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',color:'#64748B' }}>Chargement...</div>
  return user ? children : <Navigate to="/candidate/auth" replace />
}

function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',color:'#64748B' }}>Chargement...</div>
  if (!user) return <Navigate to="/candidate/auth" replace />
  if (profile && !['admin','super_admin','charged_dossier','accountant','editor'].includes(profile.role)) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  useAnalytics()
  return (
    <Routes>
      {/* Site public */}
      <Route path="/"               element={<Layout><HomePage /></Layout>} />
      <Route path="/services"       element={<Layout><ServicesPage /></Layout>} />
      <Route path="/certifications" element={<Layout><CertificationsPage /></Layout>} />
      <Route path="/partnerships"   element={<Layout><PartnershipsPage /></Layout>} />
      <Route path="/blog"           element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug"     element={<Layout><ArticlePage /></Layout>} />
      <Route path="/contact"        element={<Layout><ContactPage /></Layout>} />

      {/* Pages légales */}
      <Route path="/legal/mentions"          element={<Layout><MentionsLegales /></Layout>} />
      <Route path="/legal/confidentialite"   element={<Layout><PolitiqueConfidentialite /></Layout>} />
      <Route path="/legal/cgv"               element={<Layout><CGV /></Layout>} />

      {/* Espace candidat */}
      <Route path="/candidate/auth"      element={<AuthPage />} />
      <Route path="/candidate/dashboard" element={<PrivateRoute><CandidateDashboard /></PrivateRoute>} />

      {/* Admin */}
      <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
