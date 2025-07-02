// Transformador de datos para creación de doctores siguiendo la estructura correcta de Prisma
// Basado en las notas del usuario para eliminar el conflicto profileId vs profile.create

import type { CreateDoctorRequest } from '../types/doctor'

/**
 * Transforma los datos del formulario frontend al formato correcto para Prisma
 * IMPORTANTE: NO incluye profileId para evitar conflictos con profile.create
 */
export const transformDoctorData = (formData: CreateDoctorRequest) => {
  console.group('🔄 TRANSFORMING DOCTOR DATA')
  console.log('📝 Original Form Data:', formData)

  // Estructura correcta según las notas del usuario
  const doctorData = {
    licenseNumber: formData.licenseNumber,
    resume: formData.resume || null,
    // NO incluir profileId aquí - esto es clave para evitar el error de Prisma
    profile: {
      create: {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        birthday: formData.birthday ? new Date(formData.birthday) : null,
        gender: formData.gender || null,
        phone: formData.phone || null,
        address: formData.address || null,
        typeDocument: formData.typeDocument || null,
        numberDocument: formData.numberDocument || null,
        // Crear el usuario asociado automáticamente
        user: {
          create: {
            name: formData.name,
            email: formData.email,
            password: generateTemporaryPassword(),
            role: 'DOCTOR',
            validateEmail: false
          }
        }
      }
    },
    // Especialidades (si las hay)
    ...(formData.specialtyIds && formData.specialtyIds.length > 0 && {
      specialties: {
        create: formData.specialtyIds.map(specialtyId => ({
          specialtyId
        }))
      }
    })
  }

  // Validaciones críticas
  validateDoctorData(doctorData)
  
  console.log('✅ Transformed Data (Ready for Prisma):', JSON.stringify(doctorData, null, 2))
  console.groupEnd()

  return doctorData
}

/**
 * Valida que los datos transformados cumplan con los requisitos de Prisma
 */
function validateDoctorData(data: any) {
  const errors: string[] = []

  // Verificar que NO hay profileId (causa del error original)
  if ('profileId' in data) {
    errors.push('❌ CRÍTICO: profileId present in data object - this will cause Prisma error!')
  }

  // Verificar estructura profile.create
  if (!data.profile || !data.profile.create) {
    errors.push('❌ Missing profile.create structure')
  }

  // Verificar campos requeridos del perfil
  const profile = data.profile?.create
  if (profile) {
    if (!profile.name) errors.push('❌ Missing profile.name')
    if (!profile.lastName) errors.push('❌ Missing profile.lastName')
    if (!profile.email) errors.push('❌ Missing profile.email')
    
    // Verificar usuario anidado
    if (!profile.user || !profile.user.create) {
      errors.push('❌ Missing profile.user.create structure')
    } else {
      const user = profile.user.create
      if (!user.name) errors.push('❌ Missing user.name')
      if (!user.email) errors.push('❌ Missing user.email')
      if (!user.password) errors.push('❌ Missing user.password')
      if (!user.role) errors.push('❌ Missing user.role')
    }
  }

  // Verificar campos del doctor
  if (!data.licenseNumber) {
    errors.push('❌ Missing licenseNumber')
  }

  if (errors.length > 0) {
    console.error('🚨 VALIDATION ERRORS:', errors)
    throw new Error(`Doctor data validation failed: ${errors.join(', ')}`)
  }

  console.log('✅ All validations passed!')
}

/**
 * Genera una contraseña temporal para el usuario
 */
function generateTemporaryPassword(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `temp_${timestamp}_${random}`
}

/**
 * Valida si un email ya existe (para uso en frontend)
 * Nota: Esta validación también debe hacerse en el backend
 */
export const validateUniqueEmail = async (email: string): Promise<boolean> => {
  try {
    // Implementar llamada a API para verificar email único
    // const response = await fetch(`/api/users/check-email?email=${email}`)
    // return response.ok
    console.log('🔍 Email uniqueness check:', email)
    return true // Por ahora retorna true, implementar en backend
  } catch (error) {
    console.error('Error checking email uniqueness:', error)
    return false
  }
}
