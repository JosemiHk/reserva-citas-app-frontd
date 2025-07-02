import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { CreateSpecialtyRequest, Specialty } from '../../types/specialty'

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newSpecialty: CreateSpecialtyRequest) => {
      const data = await ApiBackend.post('/specialties', newSpecialty)
      return data as Specialty
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
    },
  })
}
