import { Alert, Box, Button, Paper, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useCreatePatient } from '../../hook/patients/useCreatePatient'

const PatientNewPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    address: '',
        typeDocument: '',
    numberDocument: '',
    emergencyContact: '',
    bloodType: '',
    allergies: '',
    chronic_conditions: '',
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const createPatient = useCreatePatient()

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const genders = ['Masculino', 'Femenino', 'Otro']
  const documentTypes = ['DNI', 'Carnet de Extranjería', 'Pasaporte']

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSelectChange = (field: string) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    
    createPatient.mutate(
      formData,
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => {
            navigate('/admin/patients')
          }, 2000)
        },
      }
    )
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
          Nuevo Paciente
        </Typography>
      </Box>

      <Paper elevation={4} sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6" gutterBottom>
            Información Personal
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Apellido"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                value={formData.birthday}
                onChange={handleInputChange('birthday')}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Género</InputLabel>
                <Select
                  value={formData.gender}
                  label="Género"
                  onChange={handleSelectChange('gender')}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                value={formData.address}
                onChange={handleInputChange('address')}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Documentación
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de documento</InputLabel>
                <Select
                  value={formData.typeDocument}
                  label="Tipo de documento"
                  onChange={handleSelectChange('typeDocument')}
                >
                  {documentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de documento"
                value={formData.numberDocument}
                onChange={handleInputChange('numberDocument')}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Información Médica
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contacto de emergencia"
                value={formData.emergencyContact}
                onChange={handleInputChange('emergencyContact')}
                required
                fullWidth
                placeholder="Nombre y teléfono del contacto"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de sangre</InputLabel>
                <Select
                  value={formData.bloodType}
                  label="Tipo de sangre"
                  onChange={handleSelectChange('bloodType')}
                >
                  {bloodTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Alergias"
                value={formData.allergies}
                onChange={handleInputChange('allergies')}
                multiline
                rows={3}
                fullWidth
                placeholder="Describa cualquier alergia conocida..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Condiciones crónicas"
                value={formData.chronic_conditions}
                onChange={handleInputChange('chronic_conditions')}
                multiline
                rows={3}
                fullWidth
                placeholder="Describa cualquier condición médica crónica..."
              />
            </Grid>
          </Grid>          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={createPatient.isPending}
            size="large"
            sx={{ mt: 3 }}
          >
            {createPatient.isPending ? 'Creando...' : 'Crear Paciente'}
          </Button>

          {createPatient.isError && (
            <Alert severity="error">
              {createPatient.error instanceof Error
                ? createPatient.error.message
                : 'Error al crear el paciente'}
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              ¡Paciente creado exitosamente! Redirigiendo...
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default PatientNewPage
