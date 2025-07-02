// Archivo para validar y debuggear las llamadas al backend

import type { CreateDoctorRequest } from '../types/doctor'
import type { CreatePatientRequest } from '../types/patient'

// Función helper para validar datos de médico antes de enviar
export const validateDoctorData = (data: CreateDoctorRequest): string[] => {
  const errors: string[] = []
  
  if (!data.name.trim()) errors.push('Nombre es requerido')
  if (!data.lastName.trim()) errors.push('Apellido es requerido')
  if (!data.email.trim()) errors.push('Email es requerido')
  if (!data.licenseNumber.trim()) errors.push('Número de licencia es requerido')
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Formato de email inválido')
  }
  
  // Validar fecha de nacimiento
  if (data.birthday) {
    const birthDate = new Date(data.birthday)
    const today = new Date()
    if (birthDate >= today) {
      errors.push('Fecha de nacimiento debe ser anterior a hoy')
    }
  }
  
  return errors
}

// Función helper para validar datos de paciente antes de enviar
export const validatePatientData = (data: CreatePatientRequest): string[] => {
  const errors: string[] = []
  
  if (!data.name.trim()) errors.push('Nombre es requerido')
  if (!data.lastName.trim()) errors.push('Apellido es requerido')
  if (!data.email.trim()) errors.push('Email es requerido')
  if (!data.emergencyContact.trim()) errors.push('Contacto de emergencia es requerido')
  if (!data.bloodType.trim()) errors.push('Tipo de sangre es requerido')
  
  // Validar tipos de sangre válidos
  const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  if (data.bloodType && !validBloodTypes.includes(data.bloodType)) {
    errors.push('Tipo de sangre inválido')
  }
  
  return errors
}

// Función para transformar datos de médico al formato backend
export const transformDoctorForBackend = (data: CreateDoctorRequest) => {
  return {
    licenseNumber: data.licenseNumber,
    resume: data.resume || null,
    profile: {
      create: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        birthday: data.birthday ? new Date(data.birthday).toISOString() : null,
        gender: data.gender || null,
        address: data.address || null,
        typeDocument: data.typeDocument || null,
        numberDocument: data.numberDocument || null,
        user: {
          create: {
            name: data.name,
            email: data.email,
            password: generateTemporaryPassword(),
            role: 'DOCTOR'
          }
        }
      }
    },
    ...(data.specialtyIds && data.specialtyIds.length > 0 && {
      specialties: {
        create: data.specialtyIds.map(specialtyId => ({
          specialtyId
        }))
      }
    })
  }
}

// Función para transformar datos de paciente al formato backend
export const transformPatientForBackend = (data: CreatePatientRequest) => {
  return {
    emergencyContact: data.emergencyContact,
    bloodType: data.bloodType,
    allergies: data.allergies || null,
    chronic_conditions: data.chronic_conditions || null,
    profile: {
      create: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        birthday: data.birthday ? new Date(data.birthday).toISOString() : null,
        gender: data.gender || null,
        phone: data.phone || null,
        address: data.address || null,
        typeDocument: data.typeDocument || null,
        numberDocument: data.numberDocument || null,
        user: {
          create: {
            name: data.name,
            email: data.email,
            password: generateTemporaryPassword(),
            role: 'PATIENT'
          }
        }
      }
    }
  }
}

// Función para generar password temporal
const generateTemporaryPassword = (): string => {
  // En producción, esto debería ser más seguro
  return 'temp' + Math.random().toString(36).slice(2, 10)
}

// Función para debuggear datos antes del envío
export const debugApiCall = (endpoint: string, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚀 API Call to ${endpoint}`)
    console.log('📤 Data being sent:', JSON.stringify(data, null, 2))
    console.log('📊 Data size:', JSON.stringify(data).length, 'bytes')
    console.groupEnd()
  }
}

// Ejemplos de datos correctos para testing
export const sampleDoctorData: CreateDoctorRequest = {
  name: 'Molly',
  lastName: 'Saltibañez',
  email: 'mollsal@sisol.gob.pe',
  phone: '985632147',
  birthday: '1985-03-15',
  gender: 'Femenino',
  address: 'Av. Principal 123',
  typeDocument: 'DNI',
  numberDocument: '12345678',
  licenseNumber: '880862431',
  resume: 'Medico graduado de la Sideral Carrion',
  specialtyIds: [1, 2]
}

export const samplePatientData: CreatePatientRequest = {
  name: 'Ana',
  lastName: 'García',
  email: 'ana.garcia@email.com',
  birthday: '1990-07-20',
  gender: 'Femenino',
  phone: '987654321',
  address: 'Calle Secundaria 456',
  typeDocument: 'DNI',
  numberDocument: '87654321',
  emergencyContact: 'Juan Pérez - 987654321',
  bloodType: 'O+',
  allergies: 'Penicilina',
  chronic_conditions: 'Diabetes tipo 2'
}

// Función para verificar que los datos transformados son correctos
export const verifyTransformedData = (originalData: any, transformedData: any, type: 'doctor' | 'patient') => {
  const issues: string[] = []
  
  // Verificaciones comunes
  if (transformedData.profile?.create?.name !== originalData.name) {
    issues.push('Name mismatch in profile.create')
  }
  
  if (transformedData.profile?.create?.email !== originalData.email) {
    issues.push('Email mismatch in profile.create')
  }
  
  if (!transformedData.profile?.create?.user?.create) {
    issues.push('Missing user.create in profile.create')
  }
  
  // Verificaciones específicas por tipo
  if (type === 'doctor') {
    if (!transformedData.licenseNumber) {
      issues.push('Missing licenseNumber for doctor')
    }
    if (transformedData.profile?.create?.user?.create?.role !== 'DOCTOR') {
      issues.push('Incorrect role for doctor')
    }
  }
  
  if (type === 'patient') {
    if (!transformedData.emergencyContact) {
      issues.push('Missing emergencyContact for patient')
    }
    if (!transformedData.bloodType) {
      issues.push('Missing bloodType for patient')
    }
    if (transformedData.profile?.create?.user?.create?.role !== 'PATIENT') {
      issues.push('Incorrect role for patient')
    }
  }
  
  return issues
}
