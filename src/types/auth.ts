import z from 'zod'
import { Role } from './user'

export const userSignupSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto válido"
  }).min(1, "El nombre no puede estar vacío").max(100, "El nombre es muy largo"),
  
  email: z.string({
    required_error: "El correo electrónico es requerido",
    invalid_type_error: "El correo debe ser un texto válido"
  }).email("El correo ingresado no es válido"),
  
  password: z.string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña debe ser un texto válido"
  }).min(6, "La contraseña debe tener al menos 6 caracteres").max(100, "La contraseña es muy larga"),
  
  role: z.nativeEnum(Role),
})

export const userLoginSchema = z.object({
  email: z.string({
    required_error: "El correo electrónico es requerido",
    invalid_type_error: "El correo debe ser un texto válido"
  }).email("El correo ingresado no es válido"),
  
  password: z.string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña debe ser un texto válido"
  }).min(1, "La contraseña no puede estar vacía"),
})

// Función para formatear errores de Zod en mensajes amigables
export const formatValidationErrors = (errors: z.ZodError): string[] => {
  return errors.errors.map(error => {
    // Si el error ya tiene un mensaje personalizado, usarlo
    if (error.message && !error.message.includes('Required') && !error.message.includes('Expected')) {
      return error.message
    }
    
    // Mensajes de respaldo por tipo de campo
    const field = error.path[0]
    const code = error.code
    
    switch (field) {
      case 'name':
        if (code === 'too_small') return 'El nombre es requerido'
        if (code === 'too_big') return 'El nombre es muy largo'
        return 'El nombre no es válido'
        
      case 'email':
        if (code === 'invalid_string') return 'El correo electrónico es requerido'
        return 'El correo ingresado no es válido'
        
      case 'password':
        if (code === 'too_small') return 'La contraseña debe tener al menos 6 caracteres'
        if (code === 'too_big') return 'La contraseña es muy larga'
        if (code === 'invalid_string') return 'La contraseña es requerida'
        return 'La contraseña no es válida'
        
      default:
        return error.message || 'Datos inválidos'
    }
  })
}

export type SignupDto = z.infer<typeof userSignupSchema>
export type LoginDto = z.infer<typeof userLoginSchema>
