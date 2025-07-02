import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Patient } from '../../types/patient'

export const usePatients = () => {
  const dataQuery = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const data = await ApiBackend.get('/patients')
      return data as Patient[]
    },
  })

  return dataQuery
}
