export interface Specialty {
  id: number
  categoryId: number
  name: string
  deleted: boolean
  createdAt: string
  updatedAt?: string
  category?: {
    id: number
    name: string
  }
}

export interface CreateSpecialtyRequest {
  categoryId: number
  name: string
}

export interface UpdateSpecialtyRequest {
  categoryId?: number
  name?: string
}
