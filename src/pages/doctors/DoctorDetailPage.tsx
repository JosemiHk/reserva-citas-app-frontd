import { LinearProgress, Typography, Box, Paper, Chip, Button, Avatar, Grid } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import BadgeIcon from '@mui/icons-material/Badge'
import { useDoctorById } from '../../hook/doctors/useDoctorById'
import ItemContainer from '../../components/commons/ItemContainer'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isPending, data } = useDoctorById(id!)

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
          onClick={() => navigate('/admin/doctors')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Detalle del Médico
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={data?.profile.photo}
              sx={{ width: 80, height: 80, mr: 3 }}
            >
              {data?.profile.name.charAt(0)}{data?.profile.lastName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" component="h2">
                Dr. {data?.profile.name} {data?.profile.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Licencia: {data?.licenseNumber}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            href={`/admin/doctors/${id}/edit`}
          >
            Editar
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            
            <ItemContainer>
              <EmailIcon fontSize="small" />
              <Typography>{data?.profile.email}</Typography>
            </ItemContainer>

            {data?.profile.phone && (
              <ItemContainer>
                <PhoneIcon fontSize="small" />
                <Typography>{data?.profile.phone}</Typography>
              </ItemContainer>
            )}

            <ItemContainer>
              <BadgeIcon fontSize="small" />
              <Typography>ID: {data?.id}</Typography>
            </ItemContainer>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Estado:
              </Typography>
              <Chip 
                label={data?.deleted ? 'Inactivo' : 'Activo'} 
                color={data?.deleted ? 'error' : 'success'} 
                variant="outlined" 
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Especialidades
            </Typography>
            
            {data?.specialties && data.specialties.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.specialties.map((specialty) => (
                  <Chip
                    key={specialty.id}
                    label={`${specialty.specialty.name} - ${specialty.specialty.category.name}`}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No tiene especialidades asignadas
              </Typography>
            )}

            {data?.resume && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Resumen profesional:
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  {data.resume}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Fecha de registro:
              </Typography>
              <Typography variant="body1">{formatDate(data?.createdAt)}</Typography>
            </Grid>

            {data?.updatedAt && (
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Última actualización:
                </Typography>
                <Typography variant="body1">{formatDate(data?.updatedAt)}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default DoctorDetailPage
