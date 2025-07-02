import { Alert, Box, Button, Paper, TextField, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useCreateSpecialty } from '../../hook/specialties/useCreateSpecialty'
import { useCategories } from '../../hook/categories/useCategories'

const SpecialtyNewPage = () => {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const createSpecialty = useCreateSpecialty()
  const { data: categories } = useCategories()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    createSpecialty.mutate(
      { 
        name, 
        categoryId: parseInt(categoryId) 
      },
      {
        onSuccess: () => {
          setSuccess(true)
          setName('')
          setCategoryId('')
          setTimeout(() => {
            navigate('/admin/specialties')
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
          onClick={() => navigate('/admin/specialties')}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Nueva Especialidad
        </Typography>
      </Box>

      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Nombre de la especialidad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            placeholder="Ej: Cardiología, Dermatología, etc."
          />

          <FormControl fullWidth required>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryId}
              label="Categoría"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={createSpecialty.isPending}
            size="large"
          >
            {createSpecialty.isPending ? 'Creando...' : 'Crear Especialidad'}
          </Button>

          {createSpecialty.isError && (
            <Alert severity="error">
              {createSpecialty.error instanceof Error
                ? createSpecialty.error.message
                : 'Error al crear la especialidad'}
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              ¡Especialidad creada exitosamente! Redirigiendo...
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default SpecialtyNewPage
