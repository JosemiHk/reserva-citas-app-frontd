import { Link } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import Header from '../components/layout/Header'

const features = [
  {
    title: 'Agenda de citas sin complicaciones',
    description:
      'Permite a tus pacientes reservar, reprogramar o cancelar citas fácilmente desde cualquier dispositivo, en cualquier momento.',
  },
  {
    title: 'Encuentra al especialista ideal',
    description:
      'Los pacientes pueden buscar médicos por especialidad, experiencia o disponibilidad, facilitando la conexión con el profesional adecuado.',
  },
  {
    title: 'Recordatorios automáticos',
    description:
      'Reduce ausencias y cancelaciones enviando notificaciones automáticas por correo o mensaje de texto para recordar cada cita.',
  },
  {
    title: 'Control total de la agenda médica',
    description:
      'Médicos y recepcionistas pueden gestionar la agenda de forma flexible: ajustar horarios, bloquear días, gestionar urgencias y optimizar el tiempo de consulta.',
  },
  {
    title: 'Seguridad de la información',
    description:
      'Protegemos los datos personales y médicos cumpliendo con los más altos estándares de privacidad y regulaciones internacionales.',
  },
  {
    title: 'Mejor experiencia para tus pacientes',
    description:
      'Ofrece un servicio moderno, cómodo y confiable. Pacientes satisfechos regresan y recomiendan tu centro médico.',
  },
  {
    title: 'Soporte y acompañamiento',
    description:
      'Nuestro equipo brinda soporte técnico y capacitación para que tu personal y médicos aprovechen al máximo la plataforma.',
  },
]

const Main = () => {
  const { user } = useAuthContext()

  return (
    <>
      {/* Header fijo */}
      <Header />
      
      {/* Main content con padding para el header fijo */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50" style={{background: 'linear-gradient(135deg, #F2F2F2 0%, rgba(3, 166, 150, 0.1) 100%)'}}>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
          <div className="text-center mb-16">
            {/* Logo SISOL centrado */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #034C8C, #03A696)'}}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold" style={{color: '#034C8C'}}>SISOL SALUD</h2>
              </div>
            </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{color: '#034C8C'}}>
            Reserva tu cita médica 
            <span className="block" style={{color: '#03A696'}}>en segundos</span>
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto" style={{color: '#1C588C'}}>
            La forma más moderna y sencilla de gestionar tus reservas, agenda y
            pacientes con la tecnología más avanzada del SISOL Lima.
          </p>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={user ? '/admin' : '/auth/login'}
              className="btn-sisol-primary inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold text-white shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Comenzar ahora
            </Link>
            <button className="btn-sisol-secondary inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold text-white shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver demo
            </button>
          </div>
        </div>

        {/* Características destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-6 hover-lift border-l-4"
              style={{
                borderLeftColor: index % 3 === 0 ? '#034C8C' : index % 3 === 1 ? '#03A696' : '#F28705',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(3, 166, 150, 0.02) 100%)'
              }}
            >
              <div className="mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    background: index % 3 === 0 ? 'linear-gradient(135deg, #034C8C, #1C588C)' : 
                              index % 3 === 1 ? 'linear-gradient(135deg, #03A696, #1C588C)' : 
                              'linear-gradient(135deg, #F28705, #034C8C)'
                  }}
                >
                  {index % 3 === 0 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {index % 3 === 1 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {index % 3 === 2 && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{color: '#034C8C'}}>{feature.title}</h3>
              <p style={{color: '#1C588C'}}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Sección de estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8" style={{color: '#034C8C'}}>
            Confían en nosotros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{color: '#03A696'}}>1000+</div>
              <p style={{color: '#1C588C'}}>Pacientes atendidos</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{color: '#F28705'}}>50+</div>
              <p style={{color: '#1C588C'}}>Especialistas</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{color: '#034C8C'}}>15</div>
              <p style={{color: '#1C588C'}}>Centros médicos</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{color: '#03A696'}}>24/7</div>
              <p style={{color: '#1C588C'}}>Soporte disponible</p>
            </div>
          </div>
        </div>        {/* Footer */}
        <div className="text-center py-8 border-t" style={{borderColor: '#03A696'}}>
          <p className="text-sm" style={{color: '#1C588C'}}>
            &copy; {new Date().getFullYear()} SISOL Lima - Sistema Integrado de Salud. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Main
