import { Alert, Box, Button, Paper, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSpecialties } from '../../hook/specialties/useSpecialties'
import { useCreateDoctor } from '../../hook/doctors/useCreateDoctor'

const DoctorNewPage = () => {
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
    licenseNumber: '',
    resume: '',
  })
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([])
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { data: specialties } = useSpecialties()
  const createDoctor = useCreateDoctor()

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
    
    createDoctor.mutate(
      {
        ...formData,
        specialtyIds: selectedSpecialties
      },
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => {
            navigate('/admin/doctors')
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
          onClick={() => navigate('/admin/doctors')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Nuevo Médico
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
            Información Profesional
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de licencia"
                value={formData.licenseNumber}
                onChange={handleInputChange('licenseNumber')}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Especialidades</InputLabel>
                <Select
                  multiple
                  value={selectedSpecialties}
                  onChange={(e) => setSelectedSpecialties(e.target.value as number[])}
                  input={<OutlinedInput label="Especialidades" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const specialty = specialties?.find(s => s.id === value)
                        return (
                          <Chip key={value} label={specialty?.name} size="small" />
                        )
                      })}
                    </Box>
                  )}
                >
                  {specialties?.map((specialty) => (
                    <MenuItem key={specialty.id} value={specialty.id}>
                      {specialty.name} - {specialty.category?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Resumen profesional"
                value={formData.resume}
                onChange={handleInputChange('resume')}
                multiline
                rows={4}
                fullWidth
                placeholder="Describe la experiencia y logros profesionales del médico..."
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={createDoctor.isPending}
            size="large"
            sx={{ mt: 3 }}
          >
            {createDoctor.isPending ? 'Creando...' : 'Crear Médico'}
          </Button>

          {createDoctor.isError && (
            <Alert severity="error">
              {createDoctor.error instanceof Error
                ? createDoctor.error.message
                : 'Error al crear el médico'}
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              ¡Médico creado exitosamente! Redirigiendo...
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default DoctorNewPage
