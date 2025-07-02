import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Specialty } from '../../types/specialty'

export const useSpecialtyById = (id: string) => {
  const dataQuery = useQuery({
    queryKey: ['specialty', id],
    queryFn: async () => {
      const data = await ApiBackend.get(`/specialties/${id}`)
      return data as Specialty
    },
    enabled: !!id,
  })

  return dataQuery
}
