import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { CreateDoctorRequest, Doctor } from '../../types/doctor'
import { transformDoctorData } from '../../utils/doctorDataTransformer'

export const useCreateDoctor = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (doctorData: CreateDoctorRequest) => {
      // Transformar datos al formato correcto de Prisma (SIN profileId)
      const backendData = transformDoctorData(doctorData)

      console.log('🚀 Sending to API (Prisma format):', JSON.stringify(backendData, null, 2))

      const data = await ApiBackend.post('/doctors', backendData)
      return data as Doctor
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
    },
  })
}
