import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'

const Header = () => {
  const { user } = useAuthContext()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2" style={{borderBottomColor: '#03A696'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo SISOL */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #034C8C, #03A696)'}}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold" style={{color: '#034C8C'}}>Sisol</span>
          </Link>          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/servicios" className="nav-link">
              Servicios
            </Link>
            <Link to="/especialistas" className="nav-link">
              Especialistas
            </Link>
            <Link to="/contacto" className="nav-link">
              Contacto
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/admin"
                className="btn-sisol-primary px-6 py-2 rounded-lg font-semibold text-white"
              >
                Panel Admin
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="btn-header-login px-6 py-2 rounded-lg font-semibold text-white"
              >
                INICIAR SESIÓN
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg" style={{color: '#034C8C'}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
