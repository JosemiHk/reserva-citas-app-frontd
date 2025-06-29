import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useSignup } from '../../hook/auth/useSignup'
import { userSignupSchema } from '../../types/auth'
import { Role } from '../../types/user'

const SignupCard = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const signupMutation = useSignup()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { name, email, password, role: Role.USER }
    const result = userSignupSchema.safeParse(data)

    if (!result.success) {
      setError(JSON.stringify(result.error.errors) || 'Datos inválidos')

      return
    }

    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate('/auth/login')
      },
      onError: (err: any) => {
        setError(err?.message || 'Error al registrar la cuenta')
      },
    })
  }

  return (
    <>
      {/* Icon container */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
        style={{background: 'linear-gradient(135deg, rgba(3, 166, 150, 0.1), rgba(3, 76, 140, 0.1))'}}
      >
        <AccountCircleIcon style={{color: '#034C8C', fontSize: '2rem'}} />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{color: '#034C8C'}}>
          Crear cuenta
        </h2>
        <p className="text-sm" style={{color: '#1C588C'}}>
          Completa el formulario para unirte al sistema SISOL
        </p>
      </div>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label 
            className="block text-sm font-semibold" 
            htmlFor="name"
            style={{color: '#034C8C'}}
          >
            Nombre completo
          </label>
          <div className="relative">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input w-full rounded-lg px-4 py-3 text-sm"
              placeholder="Tu nombre completo"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: '#03A696'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

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
          <label 
            className="block text-sm font-semibold" 
            htmlFor="password"
            style={{color: '#034C8C'}}
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
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

        <div className="space-y-1">
          <label
            className="block text-sm font-semibold"
            htmlFor="confirmPassword"
            style={{color: '#034C8C'}}
          >
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input w-full rounded-lg px-4 py-3 text-sm"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5" style={{color: '#03A696'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="auth-button w-full text-white rounded-lg py-3 font-semibold text-sm flex items-center justify-center space-x-2"
        >
          {signupMutation.isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Crear Cuenta</span>
            </>
          )}
        </button>

        {error && (
          <div className="auth-error rounded-lg px-4 py-3 text-center text-sm font-medium break-words">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm" style={{color: '#1C588C'}}>
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" className="auth-link font-semibold">
            Inicia sesión aquí
          </a>
        </p>        <div className="mt-4 pt-4 border-t" style={{borderColor: 'rgba(3, 166, 150, 0.2)'}}>
          <p className="text-xs" style={{color: '#1C588C'}}>
            © 2025 SISOL Lima - Registro seguro y confiable
          </p>        </div>
      </div>
    </>
  )
}

export default SignupCard
