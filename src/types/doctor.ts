export interface Doctor {
  id: number
  profileId: number
  licenseNumber: string
  resume?: string
  deleted: boolean
  createdAt: string
  updatedAt?: string
  profile: {
    id: number
    name: string
    lastName: string
    email: string
    phone?: string
    photo?: string
    user: {
      id: number
      name: string
      email: string
    }
  }
  specialties?: DoctorSpecialty[]
}

export interface DoctorSpecialty {
  id: number
  specialty: {
    id: number
    name: string
    category: {
      id: number
      name: string
    }
  }
}

export interface CreateDoctorRequest {
  // Datos del perfil (se creará automáticamente)
  name: string
  lastName: string
  email: string
  phone?: string
  birthday?: string
  gender?: string
  address?: string
  typeDocument?: string
  numberDocument?: string
  
  // Datos específicos del médico
  licenseNumber: string
  resume?: string
  specialtyIds: number[]
}

export interface CreateDoctorBackendRequest {
  licenseNumber: string
  resume?: string
  profile: {
    create: {
      name: string
      lastName: string
      email: string
      phone?: string
      birthday?: string
      gender?: string
      address?: string
      typeDocument?: string
      numberDocument?: string
      user: {
        create: {
          name: string
          email: string
          password: string
          role: string
        }
      }
    }
  }
  specialties?: {
    create: Array<{
      specialtyId: number
    }>
  }
}

export interface UpdateDoctorRequest {
  name?: string
  lastName?: string
  email?: string
  phone?: string
  licenseNumber?: string
  resume?: string
  specialtyIds?: number[]
}
