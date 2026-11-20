import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const isAdmin = localStorage.getItem('wingora_is_admin') === 'true'
  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }
  return children
}
