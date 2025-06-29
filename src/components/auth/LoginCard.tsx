import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLoginMutation } from '../../hook/auth/useLogin'
import LayoutAuth from './LayoutAuth'

const LoginCard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginMutation.mutateAsync(
      { email, password },
      {
        onSuccess: (data) => {
          const { userId } = data
          localStorage.setItem('userId', userId)

          window.location.href = '/admin'
        },
      }
    )
  }
  return (
    <LayoutAuth icon={<LockOpenIcon fontSize="inherit" />}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{color: '#034C8C'}}>
          Inicia sesión en tu cuenta
        </h2>
        <p className="text-sm" style={{color: '#1C588C'}}>
          Ingresa tu correo y contraseña para acceder al sistema
        </p>
      </div>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label 
            className="block text-sm font-semibold" 
            htmlFor="email"
            style={{color: '#034C8C'}}
          >
            Correo electrónico
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input w-full rounded-lg px-4 py-3 text-sm"
              placeholder="correo@sisol.gob.pe"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: '#03A696'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label 
              className="text-sm font-semibold" 
              htmlFor="password"
              style={{color: '#034C8C'}}
            >
              Contraseña
            </label>
            {/* <Link to="/auth/forgot" className="auth-link text-xs">
                ¿Olvidaste tu contraseña?
              </Link> */}
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input w-full rounded-lg px-4 py-3 text-sm"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: '#03A696'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="auth-button w-full text-white rounded-lg py-3 font-semibold text-sm flex items-center justify-center space-x-2"
        >
          {loginMutation.isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Ingresando...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Ingresar al Sistema</span>
            </>
          )}
        </button>

        {loginMutation.isError && (
          <div className="auth-error rounded-lg px-4 py-3 text-center text-sm font-medium">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>
                {loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : 'Error al iniciar sesión. Verifica tus credenciales.'}
              </span>
            </div>
          </div>
        )}

        {loginMutation.isSuccess && (
          <div className="auth-success rounded-lg px-4 py-3 text-center text-sm font-medium">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>¡Sesión iniciada correctamente! Redirigiendo...</span>
            </div>
          </div>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm" style={{color: '#1C588C'}}>
          ¿No tienes cuenta?{' '}
          <Link to="/auth/signup" className="auth-link font-semibold">
            Regístrate aquí
          </Link>
        </p>
        <div className="mt-4 pt-4 border-t" style={{borderColor: 'rgba(3, 166, 150, 0.2)'}}>
          <p className="text-xs" style={{color: '#1C588C'}}>
            © 2025 SISOL Lima - Sistema seguro y confiable
          </p>
        </div>
      </div>
    </LayoutAuth>
  )
}

export default LoginCard
