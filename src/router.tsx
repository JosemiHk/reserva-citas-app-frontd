import { createBrowserRouter } from 'react-router-dom'

import LayoutAdmin from './components/layout/LayoutAdmin'
import LayoutAuth from './components/layout/LayoutAuth'
import LayoutMain from './components/layout/LayoutMain'

import MainPage from './pages/Main'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

import DashboardPage from './pages/admin/DashboardPage'
import CategoryDetailPage from './pages/categories/CategoryDetailPage'
import CategoryNewPage from './pages/categories/CategoryNewPage'
import CategoryPage from './pages/categories/CategoryPage'

import SpecialtyPage from './pages/specialties/SpecialtyPage'
import SpecialtyDetailPage from './pages/specialties/SpecialtyDetailPage'
import SpecialtyNewPage from './pages/specialties/SpecialtyNewPage'

import DoctorPage from './pages/doctors/DoctorPage'
import DoctorDetailPage from './pages/doctors/DoctorDetailPage'
import DoctorNewPage from './pages/doctors/DoctorNewPage'

import PatientPage from './pages/patients/PatientPage'
import PatientDetailPage from './pages/patients/PatientDetailPage'
import PatientNewPage from './pages/patients/PatientNewPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutMain,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },  {
    path: 'admin',
    Component: LayoutAdmin,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: 'medical-appointments',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
          {
            path: ':id/detail',
            element: <CategoryDetailPage />,
          },
          {
            path: 'new',
            element: <CategoryNewPage />,
          },
        ],
      },      {
        path: 'specialties',
        children: [
          {
            path: '',
            element: <SpecialtyPage />,
          },
          {
            path: ':id/detail',
            element: <SpecialtyDetailPage />,
          },
          {
            path: 'new',
            element: <SpecialtyNewPage />,
          },
        ],
      },      {
        path: 'doctors',
        children: [
          {
            path: '',
            element: <DoctorPage />,
          },
          {
            path: ':id/detail',
            element: <DoctorDetailPage />,
          },
          {
            path: 'new',
            element: <DoctorNewPage />,
          },
        ],
      },      {
        path: 'patients',
        children: [
          {
            path: '',
            element: <PatientPage />,
          },
          {
            path: ':id/detail',
            element: <PatientDetailPage />,
          },
          {
            path: 'new',
            element: <PatientNewPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    Component: LayoutAuth,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
])

export default router
