import { Box, LinearProgress, Typography } from '@mui/material'

import SpecialtyCard from '../../components/specialty/SpecialtyCard'
import CardNew from '../../components/commons/CardNew'
import { useSpecialties } from '../../hook/specialties/useSpecialties'

const SpecialtyPage = () => {
  const { isPending, ...specialties } = useSpecialties()

  if (isPending) return <LinearProgress />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {!specialties?.data && (
        <Typography variant="h4">No hay especialidades</Typography>
      )}
      {specialties?.data?.map((item, index) => (
        <div key={`specialty-card-${index}`}>
          <SpecialtyCard item={item} />
        </div>
      ))}
      <CardNew href="/admin/specialties/new" text="Nueva Especialidad" />
    </Box>
  )
}

export default SpecialtyPage
