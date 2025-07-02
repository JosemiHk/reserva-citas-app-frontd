import PersonIcon from '@mui/icons-material/Person'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { Card, CardActionArea, CardContent, Typography, Avatar, Box, Chip } from '@mui/material'
import type { FC } from 'react'
import type { Doctor } from '../../types/doctor'
import ItemContainer from '../commons/ItemContainer'

interface DoctorCardProps {
  item: Doctor
}

const DoctorCard: FC<DoctorCardProps> = ({ item }) => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 350 }} variant="outlined">
      <CardActionArea
        component="a"
        href={`/admin/doctors/${item.id}/detail`}
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
                Dr. {item.profile.name} {item.profile.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lic. {item.licenseNumber}
              </Typography>
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
          
          {item.specialties && item.specialties.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Especialidades:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {item.specialties.slice(0, 2).map((specialty) => (
                  <Chip
                    key={specialty.id}
                    label={specialty.specialty.name}
                    size="small"
                    variant="outlined"
                  />
                ))}
                {item.specialties.length > 2 && (
                  <Chip
                    label={`+${item.specialties.length - 2} más`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DoctorCard
