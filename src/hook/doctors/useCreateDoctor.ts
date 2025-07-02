import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { CreateDoctorRequest, Doctor } from '../../types/doctor'

export const useCreateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (doctorData: CreateDoctorRequest) => {
      // Transformar los datos para el formato correcto de Prisma
      const backendData = {
        licenseNumber: doctorData.licenseNumber,
        resume: doctorData.resume,
        profile: {
          create: {
            name: doctorData.name,
            lastName: doctorData.lastName,
            email: doctorData.email,
            phone: doctorData.phone,
            birthday: doctorData.birthday ? new Date(doctorData.birthday).toISOString() : undefined,
            gender: doctorData.gender,
            address: doctorData.address,
            typeDocument: doctorData.typeDocument,
            numberDocument: doctorData.numberDocument,
            user: {
              create: {
                name: doctorData.name,
                email: doctorData.email,
                password: 'temporal123', // Password temporal - debería ser generado o solicitado
                role: 'DOCTOR'
              }
            }
          }
        },
        // Manejar especialidades si se proporcionan
        ...(doctorData.specialtyIds && doctorData.specialtyIds.length > 0 && {
          specialties: {
            create: doctorData.specialtyIds.map(specialtyId => ({
              specialtyId
            }))
          }
        })
      }

      const data = await ApiBackend.post('/doctors', backendData)
      return data as Doctor
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
  })
}
