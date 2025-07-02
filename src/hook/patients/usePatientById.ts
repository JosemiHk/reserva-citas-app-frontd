import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Patient } from '../../types/patient'

export const usePatientById = (id: string) => {
  const dataQuery = useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      const data = await ApiBackend.get(`/patients/${id}`)
      return data as Patient
    },
    enabled: !!id,
  })

  return dataQuery
}
