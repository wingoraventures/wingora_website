import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'aamirajewellery@gmail.com'
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || '12345678'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const validEmail = envEmail
    const validPassword = envPassword

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('wingora_is_admin', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded shadow p-6 text-gray-900">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email" className="block mb-2 text-sm text-gray-700">Email</label>
          <input id="admin-email" name="email" placeholder="admin@example.com" className="w-full mb-3 p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 bg-white" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="admin-password" className="block mb-2 text-sm text-gray-700">Password</label>
          <input id="admin-password" name="password" type="password" placeholder="********" className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 bg-white" value={password} onChange={e => setPassword(e.target.value)} />

          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  )
}
