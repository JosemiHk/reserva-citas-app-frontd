import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import CategoryIcon from '@mui/icons-material/Category'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import type { FC } from 'react'
import type { Specialty } from '../../types/specialty'
import ItemContainer from '../commons/ItemContainer'

interface SpecialtyCardProps {
  item: Specialty
}

const SpecialtyCard: FC<SpecialtyCardProps> = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardActionArea
        component="a"
        href={`/admin/specialties/${item.id}/detail`}
      >
        <CardContent>
          <ItemContainer>
            <MedicalServicesIcon fontSize="small" />
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {item.name}
            </Typography>
          </ItemContainer>
          <ItemContainer>
            <CategoryIcon fontSize="small" />
            <Typography variant="h5" component="div">
              {item.category?.name || 'Sin categoría'}
            </Typography>
          </ItemContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SpecialtyCard
