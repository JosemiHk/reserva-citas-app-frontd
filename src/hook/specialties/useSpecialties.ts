import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Specialty } from '../../types/specialty'

export const useSpecialties = () => {
  const dataQuery = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const data = await ApiBackend.get('/specialties')
      return data as Specialty[]
    },
  })

  return dataQuery
}
