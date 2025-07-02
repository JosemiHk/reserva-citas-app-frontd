import { LinearProgress, Typography, Box, Paper, Chip, Button, Avatar, Grid } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import CakeIcon from '@mui/icons-material/Cake'
import BadgeIcon from '@mui/icons-material/Badge'
import { usePatientById } from '../../hook/patients/usePatientById'
import ItemContainer from '../../components/commons/ItemContainer'

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isPending, data } = usePatientById(id!)

  if (isPending) return <LinearProgress />

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateAge = (birthday?: string) => {
    if (!birthday) return null
    const birthDate = new Date(birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/patients')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Detalle del Paciente
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
                {data?.profile.name} {data?.profile.lastName}
              </Typography>
              {data?.profile.birthday && (
                <Typography variant="subtitle1" color="text.secondary">
                  {calculateAge(data?.profile.birthday)} años
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            href={`/admin/patients/${id}/edit`}
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

            {data?.profile.birthday && (
              <ItemContainer>
                <CakeIcon fontSize="small" />
                <Typography>
                  {formatDate(data?.profile.birthday)} ({calculateAge(data?.profile.birthday)} años)
                </Typography>
              </ItemContainer>
            )}

            {data?.profile.address && (
              <ItemContainer>
                <LocationOnIcon fontSize="small" />
                <Typography>{data?.profile.address}</Typography>
              </ItemContainer>
            )}

            <ItemContainer>
              <BadgeIcon fontSize="small" />
              <Typography>ID: {data?.id}</Typography>
            </ItemContainer>

            {data?.profile.numberDocument && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Documento de identidad:
                </Typography>
                <Typography>
                  {data?.profile.typeDocument}: {data?.profile.numberDocument}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Género:
              </Typography>
              <Chip 
                label={data?.profile.gender || 'No especificado'} 
                variant="outlined" 
              />
            </Box>

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
              Información Médica
            </Typography>
            
            <ItemContainer>
              <BloodtypeIcon fontSize="small" />
              <Typography>
                <strong>Tipo de sangre:</strong> {data?.bloodType}
              </Typography>
            </ItemContainer>

            <ItemContainer>
              <ContactEmergencyIcon fontSize="small" />
              <Typography>
                <strong>Contacto de emergencia:</strong> {data?.emergencyContact}
              </Typography>
            </ItemContainer>

            {data?.allergies && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Alergias:
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'error.50', p: 2, borderRadius: 1, border: 1, borderColor: 'error.200' }}>
                  {data.allergies}
                </Typography>
              </Box>
            )}

            {data?.chronic_conditions && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Condiciones crónicas:
                </Typography>
                <Typography variant="body2" sx={{ bgcolor: 'warning.50', p: 2, borderRadius: 1, border: 1, borderColor: 'warning.200' }}>
                  {data.chronic_conditions}
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
              <Typography variant="body1">{formatDateTime(data?.createdAt)}</Typography>
            </Grid>

            {data?.updatedAt && (
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Última actualización:
                </Typography>
                <Typography variant="body1">{formatDateTime(data?.updatedAt)}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default PatientDetailPage
