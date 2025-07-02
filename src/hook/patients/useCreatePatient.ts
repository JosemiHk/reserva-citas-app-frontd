import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { CreatePatientRequest, Patient } from '../../types/patient'

export const useCreatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (patientData: CreatePatientRequest) => {
      // Transformar los datos para el formato correcto de Prisma
      const backendData = {
        emergencyContact: patientData.emergencyContact,
        bloodType: patientData.bloodType,
        allergies: patientData.allergies,
        chronic_conditions: patientData.chronic_conditions,
        profile: {
          create: {
            name: patientData.name,
            lastName: patientData.lastName,
            email: patientData.email,
            birthday: patientData.birthday ? new Date(patientData.birthday).toISOString() : undefined,
            gender: patientData.gender,
            phone: patientData.phone,
            address: patientData.address,
            typeDocument: patientData.typeDocument,
            numberDocument: patientData.numberDocument,
            user: {
              create: {
                name: patientData.name,
                email: patientData.email,
                password: 'temporal123', // Password temporal - debería ser generado o solicitado
                role: 'PATIENT'
              }
            }
          }
        }
      }

      const data = await ApiBackend.post('/patients', backendData)
      return data as Patient
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
