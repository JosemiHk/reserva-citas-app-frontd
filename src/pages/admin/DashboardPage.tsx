import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'

const DashboardPage = () => {
  const { user } = useAuthContext()

  // Datos simulados para el dashboard
  const dashboardStats = [
    {
      title: 'Citas de Hoy',
      value: '12',
      icon: '📅',
      color: '#034C8C',
      bgColor: 'rgba(3, 76, 140, 0.1)'
    },
    {
      title: 'Pacientes Activos',
      value: '248',
      icon: '👥',
      color: '#03A696',
      bgColor: 'rgba(3, 166, 150, 0.1)'
    },
    {
      title: 'Consultas Completadas',
      value: '35',
      icon: '✅',
      color: '#F28705',
      bgColor: 'rgba(242, 135, 5, 0.1)'
    },
    {
      title: 'Especialistas Disponibles',
      value: '8',
      icon: '👨‍⚕️',
      color: '#1C588C',
      bgColor: 'rgba(28, 88, 140, 0.1)'
    }
  ]

  const quickActions = [
    {
      title: 'Sacar Cita',
      description: 'Programa una nueva cita médica',
      icon: '📝',
      href: '/admin/medical-appointments/new',
      primary: true,
      color: '#034C8C'
    },
    {
      title: 'Ver Citas Recientes',
      description: 'Consulta el historial de citas',
      icon: '📋',
      href: '/admin/medical-appointments',
      primary: false,
      color: '#03A696'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      message: 'Nueva cita programada con Dr. García',
      time: 'Hace 15 min',
      icon: '📅'
    },
    {
      id: 2,
      type: 'patient',
      message: 'Paciente María López registrada',
      time: 'Hace 1 hora',
      icon: '👤'
    },
    {
      id: 3,
      type: 'completion',
      message: 'Consulta completada - Dr. Rodríguez',
      time: 'Hace 2 horas',
      icon: '✅'
    }
  ]

  return (
    <div className="space-y-8">      {/* Header de bienvenida */}
      <div className="glass-card rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2" style={{color: '#034C8C'}}>
              ¡Bienvenido de vuelta{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-gray-600">
              Gestiona tus citas médicas de manera fácil y rápida
            </p>
          </div>
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg quick-action-icon"
            style={{background: 'linear-gradient(135deg, #034C8C, #03A696)'}}
          >
            <span className="text-3xl">🏥</span>
          </div>
        </div>
      </div>      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="dashboard-card stat-card rounded-xl p-6 hover-lift"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl quick-action-icon"
                style={{backgroundColor: stat.bgColor}}
              >
                {stat.icon}
              </div>
              <div className="text-right">
                <div 
                  className="text-2xl font-bold"
                  style={{color: stat.color}}
                >
                  {stat.value}
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {stat.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 pulse-active"></span>
              Actualizado ahora
            </div>
          </div>
        ))}
      </div>      {/* Acciones rápidas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className={`group block dashboard-card rounded-xl p-8 hover-lift ${
              action.primary 
                ? 'action-card-primary' 
                : 'action-card-secondary'
            }`}
          >
            <div className="flex items-center space-x-6">
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md quick-action-icon`}
                style={{
                  background: action.primary 
                    ? 'linear-gradient(135deg, #034C8C, #1C588C)' 
                    : 'linear-gradient(135deg, #03A696, #034C8C)',
                  color: 'white'
                }}
              >
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 
                  className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                  style={{color: action.color}}
                >
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
                <div className="flex items-center mt-3 text-sm font-medium" style={{color: action.color}}>
                  Ir ahora
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>      {/* Grid de dos columnas para actividad reciente y accesos rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad reciente */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold" style={{color: '#034C8C'}}>
              Actividad Reciente
            </h2>
            <Link 
              to="/admin/medical-appointments" 
              className="text-sm font-medium hover:underline transition-colors duration-200"
              style={{color: '#03A696'}}
            >
              Ver todo
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover-lift"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg quick-action-icon"
                  style={{backgroundColor: 'rgba(3, 166, 150, 0.1)'}}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos adicionales */}
        <div className="dashboard-card rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6" style={{color: '#034C8C'}}>
            Accesos Rápidos
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/patients"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group hover-lift"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm quick-action-icon"
                style={{backgroundColor: 'rgba(3, 76, 140, 0.1)', color: '#034C8C'}}
              >
                👥
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Gestionar Pacientes
              </span>
            </Link>
            <Link
              to="/admin/doctors"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group hover-lift"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm quick-action-icon"
                style={{backgroundColor: 'rgba(3, 166, 150, 0.1)', color: '#03A696'}}
              >
                👨‍⚕️
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Médicos Especialistas
              </span>
            </Link>
            <Link
              to="/admin/planning"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group hover-lift"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm quick-action-icon"
                style={{backgroundColor: 'rgba(242, 135, 5, 0.1)', color: '#F28705'}}
              >
                📊
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Planificación
              </span>
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group hover-lift"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm quick-action-icon"
                style={{backgroundColor: 'rgba(28, 88, 140, 0.1)', color: '#1C588C'}}
              >
                🏷️
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Categorías
              </span>
            </Link>
          </div>
        </div>
      </div>      {/* Footer con información adicional */}
      <div className="glass-card rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center quick-action-icon"
              style={{background: 'linear-gradient(135deg, #034C8C, #03A696)'}}
            >
              <span className="text-white text-lg">ℹ️</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Sistema SISOL Lima - Dashboard Administrativo
              </p>
              <p className="text-xs text-gray-500">
                Versión 2.0 - Última actualización: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link
            to="/admin/settings"
            className="text-sm font-medium px-4 py-2 rounded-lg border-2 hover:bg-gray-50 transition-all duration-200 hover-lift"
            style={{borderColor: '#03A696', color: '#03A696'}}
          >
            Configuración
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
