import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, role, loading } = useAuth()

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'#F7F8FC', fontFamily:'sans-serif', color:'#64748B' }}>
      Chargement...
    </div>
  )

  if (!user) return <Navigate to="/auth" replace />
  if (requireAdmin && !['admin','super_admin','accountant','editor','case_manager'].includes(role)) {
    return <Navigate to="/candidate/dashboard" replace />
  }

  return children
}
