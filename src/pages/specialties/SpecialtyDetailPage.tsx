import { LinearProgress, Typography, Box, Paper, Chip, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSpecialtyById } from '../../hook/specialties/useSpecialtyById'

const SpecialtyDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isPending, data } = useSpecialtyById(id!)

  if (isPending) return <LinearProgress />

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/specialties')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Detalle de Especialidad
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            href={`/admin/specialties/${id}/edit`}
          >
            Editar
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              ID:
            </Typography>
            <Typography variant="body1">{data?.id}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Categoría:
            </Typography>
            <Chip 
              label={data?.category?.name || 'Sin categoría'} 
              color="primary" 
              variant="outlined" 
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Estado:
            </Typography>
            <Chip 
              label={data?.deleted ? 'Inactiva' : 'Activa'} 
              color={data?.deleted ? 'error' : 'success'} 
              variant="outlined" 
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Fecha de creación:
            </Typography>
            <Typography variant="body1">{formatDate(data?.createdAt)}</Typography>
          </Box>

          {data?.updatedAt && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Última actualización:
              </Typography>
              <Typography variant="body1">{formatDate(data?.updatedAt)}</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default SpecialtyDetailPage
