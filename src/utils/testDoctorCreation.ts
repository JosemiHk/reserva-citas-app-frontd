// Manual test file to validate doctor creation with correct Prisma structure
// Run this in the browser console to test data transformation

import { debugDoctorCreation } from '../utils/debugDoctorCreation'
import { transformDoctorForBackend, verifyTransformedData } from '../utils/dataValidation'
import type { CreateDoctorRequest } from '../types/doctor'

// Sample test data similar to what would come from the form
const testDoctorData: CreateDoctorRequest = {
  name: 'María',
  lastName: 'González',
  email: 'maria.gonzalez@sisol.gob.pe',
  phone: '987654321',
  birthday: '1985-03-15',
  gender: 'Femenino',
  address: 'Av. Principal 123, Lima',
  typeDocument: 'DNI',
  numberDocument: '12345678',
  licenseNumber: 'CMP-12345',
  resume: 'Médico especialista en cardiología con 10 años de experiencia.',
  specialtyIds: [1, 2]
}

console.group('🧪 MANUAL TESTING: Doctor Creation')

// Test 1: Debug function validation
console.log('\n1️⃣ Testing debugDoctorCreation function:')
const debugResult = debugDoctorCreation(testDoctorData)

// Test 2: Alternative transformation function
console.log('\n2️⃣ Testing transformDoctorForBackend function:')
const transformResult = transformDoctorForBackend(testDoctorData)
console.log('Transform result:', JSON.stringify(transformResult, null, 2))

// Test 3: Data verification
console.log('\n3️⃣ Testing data verification:')
const verificationIssues = verifyTransformedData(testDoctorData, debugResult, 'doctor')
console.log('Verification issues:', verificationIssues)

// Test 4: Structure validation
console.log('\n4️⃣ Structure validation:')
const structureChecks = {
  hasProfileId: 'profileId' in debugResult,
  hasProfile: 'profile' in debugResult,
  hasProfileCreate: debugResult.profile && 'create' in debugResult.profile,
  hasUserCreate: debugResult.profile?.create && 'user' in debugResult.profile.create,
  hasSpecialties: 'specialties' in debugResult,
  hasSpecialtiesCreate: debugResult.specialties && 'create' in debugResult.specialties,
  licenseNumberPresent: !!debugResult.licenseNumber,
  userRoleCorrect: debugResult.profile?.create?.user?.create?.role === 'DOCTOR'
}

console.log('Structure checks:', structureChecks)

// Test 5: Data integrity checks
console.log('\n5️⃣ Data integrity checks:')
const integrityChecks = {
  nameMatch: debugResult.profile?.create?.name === testDoctorData.name,
  emailMatch: debugResult.profile?.create?.email === testDoctorData.email,
  licenseMatch: debugResult.licenseNumber === testDoctorData.licenseNumber,
  specialtyCountMatch: debugResult.specialties?.create?.length === testDoctorData.specialtyIds.length,
  passwordGenerated: !!debugResult.profile?.create?.user?.create?.password
}

console.log('Integrity checks:', integrityChecks)

// Test 6: Final validation
const allChecksPass = Object.values(structureChecks).every(Boolean) && 
                     Object.values(integrityChecks).every(Boolean) &&
                     verificationIssues.length === 0

console.log('\n✅ Final validation:', allChecksPass ? 'PASSED' : 'FAILED')

if (allChecksPass) {
  console.log('🎉 Data structure is correct and ready for Prisma!')
} else {
  console.error('❌ Issues found in data structure:')
  console.error('- Structure issues:', Object.entries(structureChecks).filter(([, v]) => !v))
  console.error('- Integrity issues:', Object.entries(integrityChecks).filter(([, v]) => !v))
  console.error('- Verification issues:', verificationIssues)
}

console.groupEnd()

// Export the test result for use in other parts of the application
export { debugResult, transformResult, verificationIssues, allChecksPass }
