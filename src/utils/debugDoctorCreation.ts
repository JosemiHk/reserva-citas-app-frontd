// Archivo de debugging para identificar el problema exacto
// Usar este archivo para interceptar y verificar los datos antes de enviarlos

import type { CreateDoctorRequest } from '../types/doctor'

export const debugDoctorCreation = (data: CreateDoctorRequest) => {
  console.group('🔍 DEBUGGING DOCTOR CREATION')
  console.log('📝 Original Form Data:', data)
  
  // Transformar los datos exactamente como debe ser para Prisma
  const correctBackendData = {
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
        numberDocument: data.numberDocument || null,        user: {
          create: {
            name: data.name,
            email: data.email,
            password: `temp_${Date.now()}`, // Password temporal único
            role: 'DOCTOR',
            validateEmail: false
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
  
  console.log('✅ Transformed Backend Data:', JSON.stringify(correctBackendData, null, 2))
  
  // Verificaciones importantes
  const checks = {
    hasProfileId: 'profileId' in correctBackendData,
    hasProfile: 'profile' in correctBackendData,
    hasProfileCreate: correctBackendData.profile && 'create' in correctBackendData.profile,
    hasUserCreate: correctBackendData.profile?.create && 'user' in correctBackendData.profile.create,
    profileCreateComplete: correctBackendData.profile?.create && 
                          correctBackendData.profile.create.name && 
                          correctBackendData.profile.create.email
  }
  
  console.log('🔍 Data Checks:', checks)
  
  // Validar que no hay conflictos
  if (checks.hasProfileId && checks.hasProfile) {
    console.error('❌ CONFLICT: Both profileId and profile block present!')
  }
  
  if (!checks.hasProfile) {
    console.error('❌ MISSING: profile block is missing!')
  }
  
  if (!checks.hasProfileCreate) {
    console.error('❌ MISSING: profile.create block is missing!')
  }
  
  if (!checks.profileCreateComplete) {
    console.error('❌ INCOMPLETE: profile.create is missing required fields!')
  }
  
  console.groupEnd()
  
  return correctBackendData
}
