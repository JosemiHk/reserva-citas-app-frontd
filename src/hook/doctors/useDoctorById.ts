import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Doctor } from '../../types/doctor'

export const useDoctorById = (id: string) => {
  const dataQuery = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const data = await ApiBackend.get(`/doctors/${id}`)
      return data as Doctor
    },
    enabled: !!id,
  })

  return dataQuery
}
