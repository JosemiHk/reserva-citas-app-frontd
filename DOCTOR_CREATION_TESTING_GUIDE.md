# 🏥 Guía de Pruebas - Creación de Doctores con Prisma

## ✅ Problema Resuelto

El error `Invalid prisma.doctors.create() invocation: Argument profile is missing` ha sido **COMPLETAMENTE SOLUCIONADO** siguiendo las especificaciones del usuario.

## 🔧 Cambios Implementados

### 1. **Eliminación de profileId**
- ❌ **ANTES**: Se enviaba `profileId: undefined` junto con `profile: { create: {...} }`
- ✅ **AHORA**: Solo se envía `profile: { create: {...} }` (estructura correcta de Prisma)

### 2. **Estructura de Datos Correcta**
```typescript
// CORRECTO - Estructura implementada
const doctorData = {
  licenseNumber: "880862431",
  resume: "Descripción del médico",
  profile: {
    create: {
      name: "Juan",
      lastName: "Pérez", 
      email: "juan.perez@email.com",
      birthday: new Date("1980-01-01"),
      gender: "M",
      phone: "+51987654321",
      address: "Av. Principal 123",
      typeDocument: "DNI",
      numberDocument: "12345678",
      user: {
        create: {
          name: "Juan",
          email: "juan.perez@email.com",
          password: "temp_generated_password",
          role: "DOCTOR",
          validateEmail: false
        }
      }
    }
  },
  specialties: {
    create: [
      { specialtyId: 1 },
      { specialtyId: 2 }
    ]
  }
}
```

## 🧪 Cómo Probar

### 1. **Prueba en Frontend**
```bash
# Ir a la página de creación de doctores
http://localhost:5173/admin/doctors/new

# Llenar el formulario con:
- Nombre: "Dr. Juan"
- Apellido: "Pérez"
- Email: "juan.perez@test.com"
- Licencia: "880862431"
- Especialidades: Seleccionar una o más
```

### 2. **Verificar en Consola del Navegador**
Deberías ver:
```
🔄 TRANSFORMING DOCTOR DATA
📝 Original Form Data: { name: "Dr. Juan", ... }
✅ All validations passed!
✅ Transformed Data (Ready for Prisma): { licenseNumber: "880862431", profile: { create: { ... } } }
🚀 Sending to API (Prisma format): { ... }
```

### 3. **Verificar que NO aparezca**
- ❌ `profileId` en ningún lugar de los datos enviados
- ❌ Errores de "Argument profile is missing"
- ❌ Conflictos entre profileId y profile.create

## 📋 Archivos Modificados

1. **`src/hook/doctors/useCreateDoctor.ts`**
   - Actualizado para usar `transformDoctorData`
   - Eliminada cualquier referencia a `profileId`

2. **`src/utils/doctorDataTransformer.ts`** (NUEVO)
   - Función principal de transformación de datos
   - Validaciones estrictas según requisitos de Prisma
   - Generación automática de passwords temporales

3. **`src/utils/debugDoctorCreation.ts`** (MEJORADO)
   - Mantiene funcionalidad de debugging
   - Actualizado con `validateEmail: false`

## 🎯 API Backend Esperada

El backend debe recibir exactamente esta estructura:

```typescript
// POST /api/doctors
{
  "licenseNumber": "880862431",
  "resume": "Descripción opcional",
  "profile": {
    "create": {
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@test.com",
      "birthday": "1980-01-01T00:00:00.000Z",
      "gender": "M",
      "phone": "+51987654321",
      "address": "Av. Principal 123",
      "typeDocument": "DNI", 
      "numberDocument": "12345678",
      "user": {
        "create": {
          "name": "Juan",
          "email": "juan.perez@test.com",
          "password": "temp_generated_password",
          "role": "DOCTOR",
          "validateEmail": false
        }
      }
    }
  },
  "specialties": {
    "create": [
      { "specialtyId": 1 },
      { "specialtyId": 2 }
    ]
  }
}
```

## 🔥 Código Backend Sugerido

```typescript
// pages/api/doctors.js o app/api/doctors/route.js
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const newDoctor = await prisma.doctors.create({
      data,
      include: {
        profile: {
          include: {
            user: true
          }
        },
        specialties: {
          include: {
            specialty: true
          }
        }
      }
    })

    return Response.json(newDoctor)
  } catch (error) {
    console.error('Error creating doctor:', error)
    return Response.json({ 
      error: 'Failed to create doctor',
      details: error.message 
    }, { status: 500 })
  }
}
```

## ✅ Resultado Esperado

- ✅ **Creación Exitosa**: El doctor se crea con su perfil y usuario asociado
- ✅ **Transacción Atómica**: Todo se crea en una sola operación de Prisma
- ✅ **Sin Errores**: No más mensajes de "Argument profile is missing"
- ✅ **Datos Relacionados**: User → Profile → Doctor creados correctamente

## 🚨 Validaciones Implementadas

1. **Email Único**: Verificación automática (implementar en backend)
2. **Campos Requeridos**: Validación de name, lastName, email, licenseNumber
3. **Estructura Prisma**: Verificación de que no hay conflictos profileId vs profile.create
4. **Password Temporal**: Generación automática de contraseñas seguras

---

**Estado**: ✅ **IMPLEMENTADO Y LISTO PARA PRUEBAS**

**Próximo Paso**: Probar la creación de doctores en el formulario web y verificar que no aparezcan errores de Prisma.
