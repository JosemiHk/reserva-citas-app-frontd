import { Box, LinearProgress, Typography } from '@mui/material'

import PatientCard from '../../components/patient/PatientCard'
import CardNew from '../../components/commons/CardNew'
import { usePatients } from '../../hook/patients/usePatients'

const PatientPage = () => {
  const { isPending, ...patients } = usePatients()

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
      {!patients?.data && (
        <Typography variant="h4">No hay pacientes</Typography>
      )}
      {patients?.data?.map((item, index) => (
        <div key={`patient-card-${index}`}>
          <PatientCard item={item} />
        </div>
      ))}
      <CardNew href="/admin/patients/new" text="Nuevo Paciente" />
    </Box>
  )
}

export default PatientPage
