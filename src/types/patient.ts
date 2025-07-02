export interface Patient {
  id: number
  profileId: number
  emergencyContact: string
  bloodType: string
  allergies?: string
  chronic_conditions?: string
  deleted: boolean
  createdAt: string
  updatedAt?: string
  profile: {
    id: number
    name: string
    lastName: string
    email: string
    birthday?: string
    gender?: string
    phone?: string
    photo?: string
    address?: string
    typeDocument?: string
    numberDocument?: string
    user: {
      id: number
      name: string
      email: string
    }
  }
}

export interface CreatePatientRequest {
  // Datos del perfil
  name: string
  lastName: string
  email: string
  birthday?: string
  gender?: string
  phone?: string
  address?: string
  typeDocument?: string
  numberDocument?: string
  
  // Datos específicos del paciente
  emergencyContact: string
  bloodType: string
  allergies?: string
  chronic_conditions?: string
}

export interface CreatePatientBackendRequest {
  emergencyContact: string
  bloodType: string
  allergies?: string
  chronic_conditions?: string
  profile: {
    create: {
      name: string
      lastName: string
      email: string
      birthday?: string
      gender?: string
      phone?: string
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
}

export interface UpdatePatientRequest {
  name?: string
  lastName?: string
  email?: string
  birthday?: string
  gender?: string
  phone?: string
  address?: string
  typeDocument?: string
  numberDocument?: string
  emergencyContact?: string
  bloodType?: string
  allergies?: string
  chronic_conditions?: string
}
