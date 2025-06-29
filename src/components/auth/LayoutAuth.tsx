import type { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  icon?: ReactNode
}

const LayoutAuth: FC<LayoutProps> = ({ children, icon }) => {
  return (
    <div className="auth-container flex items-center justify-center min-h-screen min-w-full px-4">
      <div className="auth-card rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          {/* Logo Container - Espacio destinado para el logo del hospital */}
          <div className="flex items-center space-x-3 mb-2">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
              style={{background: 'linear-gradient(135deg, #034C8C, #03A696)'}}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>            <div>
              <div
                className="text-2xl font-bold mb-0 cursor-pointer"
                style={{color: '#034C8C'}}
                onClick={() => window.location.href = '/'}
              >
                SISOL
              </div>
              <p className="text-sm" style={{color: '#03A696', margin: 0}}>
                Sistema Integrado de Salud
              </p>
            </div>
          </div>
          
          {/* Icon container */}
          {icon && (
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
              style={{background: 'linear-gradient(135deg, rgba(3, 166, 150, 0.1), rgba(3, 76, 140, 0.1))'}}
            >
              <span className="text-4xl" style={{color: '#034C8C'}}>{icon}</span>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default LayoutAuth
