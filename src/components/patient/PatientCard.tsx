import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import { Card, CardActionArea, CardContent, Typography, Avatar, Box, Chip } from '@mui/material'
import type { FC } from 'react'
import type { Patient } from '../../types/patient'
import ItemContainer from '../commons/ItemContainer'

interface PatientCardProps {
  item: Patient
}

const PatientCard: FC<PatientCardProps> = ({ item }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-ES')
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
    <Card sx={{ minWidth: 300, maxWidth: 350 }} variant="outlined">
      <CardActionArea
        component="a"
        href={`/admin/patients/${item.id}/detail`}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={item.profile.photo}
              sx={{ width: 56, height: 56, mr: 2 }}
            >
              {item.profile.name.charAt(0)}{item.profile.lastName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {item.profile.name} {item.profile.lastName}
              </Typography>
              {item.profile.birthday && (
                <Typography variant="body2" color="text.secondary">
                  {calculateAge(item.profile.birthday)} años
                </Typography>
              )}
            </Box>
          </Box>
          
          <ItemContainer>
            <EmailIcon fontSize="small" />
            <Typography
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {item.profile.email}
            </Typography>
          </ItemContainer>
          
          {item.profile.phone && (
            <ItemContainer>
              <PhoneIcon fontSize="small" />
              <Typography
                sx={{ color: 'text.secondary', fontSize: 14 }}
              >
                {item.profile.phone}
              </Typography>
            </ItemContainer>
          )}
          
          <ItemContainer>
            <BloodtypeIcon fontSize="small" />
            <Typography
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              Tipo de sangre: {item.bloodType}
            </Typography>
          </ItemContainer>
          
          {item.profile.numberDocument && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {item.profile.typeDocument}: {item.profile.numberDocument}
              </Typography>
            </Box>
          )}
          
          {item.profile.gender && (
            <Box sx={{ mt: 1 }}>
              <Chip
                label={item.profile.gender}
                size="small"
                variant="outlined"
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PatientCard
