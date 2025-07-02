# Guía de Corrección: Creación de Médicos y Pacientes con Prisma

## Problema Identificado

El error `Invalid 'prisma.doctors.create()' invocation: Argument 'profile' is missing` ocurre porque:

1. **Relación incorrecta**: Se está enviando `profileId: undefined` junto con un bloque `profile` anidado
2. **Estructura de datos conflictiva**: Prisma espera solo una estrategia para manejar la relación

## Solución Implementada

### 1. Estructura de Datos Correcta para Backend

#### Para Médicos:
```typescript
const backendData = {
  licenseNumber: "880862431",
  resume: "Medico graduado de la Sideral Carrion",
  profile: {
    create: {
      name: "Molly",
      lastName: "Saltibañez",
      email: "mollsal@sisol.gob.pe",
      phone: "985632147",
      birthday: "1985-03-15T00:00:00.000Z",
      gender: "Femenino",
      address: "Av. Principal 123",
      typeDocument: "DNI",
      numberDocument: "12345678",
      user: {
        create: {
          name: "Molly",
          email: "mollsal@sisol.gob.pe",
          password: "temporal123",
          role: "DOCTOR"
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

#### Para Pacientes:
```typescript
const backendData = {
  emergencyContact: "Juan Pérez - 987654321",
  bloodType: "O+",
  allergies: "Penicilina",
  chronic_conditions: "Diabetes tipo 2",
  profile: {
    create: {
      name: "Ana",
      lastName: "García",
      email: "ana.garcia@email.com",
      birthday: "1990-07-20T00:00:00.000Z",
      gender: "Femenino",
      phone: "987654321",
      address: "Calle Secundaria 456",
      typeDocument: "DNI",
      numberDocument: "87654321",
      user: {
        create: {
          name: "Ana",
          email: "ana.garcia@email.com",
          password: "temporal123",
          role: "PATIENT"
        }
      }
    }
  }
}
```

### 2. Errores Comunes a Evitar

❌ **INCORRECTO:**
```typescript
{
  profileId: undefined,
  licenseNumber: "880862431",
  profile: {
    create: { ... }
  }
}
```

✅ **CORRECTO:**
```typescript
{
  licenseNumber: "880862431",
  profile: {
    create: { ... }
  }
}
```

### 3. Relaciones en Prisma Schema

```prisma
model Doctors {
  id            Int                  @id @default(autoincrement())
  profileId     Int                  @unique
  licenseNumber String
  resume        String?
  profile       Profiles             @relation(fields: [profileId], references: [id], onDelete: Cascade)
  specialties   DoctorsSpecialties[]
}

model Profiles {
  id      Int       @id @default(autoincrement())
  name    String
  // ... otros campos
  userId  Int       @unique
  user    Users     @relation(fields: [userId], references: [id], onDelete: Cascade)
  patient Patients?
  doctor  Doctors?
}
```

### 4. Estrategias de Relación en Prisma

#### A. profile.create (Usado en nuestra solución)
```typescript
profile: {
  create: {
    name: "...",
    email: "...",
    // ... otros campos del perfil
  }
}
```

#### B. profile.connect (Si el perfil ya existe)
```typescript
profile: {
  connect: {
    id: existingProfileId
  }
}
```

#### C. profile.connectOrCreate (Manejo híbrido)
```typescript
profile: {
  connectOrCreate: {
    where: {
      email: "user@email.com"
    },
    create: {
      name: "...",
      email: "...",
      // ... otros campos
    }
  }
}
```

### 5. Validaciones Necesarias

- **Email único**: Verificar que el email no exista antes de crear
- **Número de licencia único**: Para médicos
- **Documentos únicos**: DNI, etc.
- **Especialidades válidas**: Verificar que existan las especialidades seleccionadas

### 6. Pasos para Testing

1. **Verificar estructura de datos**:
   ```typescript
   console.log('Data being sent:', JSON.stringify(backendData, null, 2))
   ```

2. **Probar en backend directamente**:
   ```typescript
   const result = await prisma.doctors.create({
     data: backendData,
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
   ```

3. **Verificar respuesta**:
   - Confirmar que se crearon todos los registros relacionados
   - Verificar que las IDs se asignaron correctamente

### 7. Mejoras Futuras

1. **Generación de passwords**: Implementar sistema de generación de passwords seguras
2. **Validación de emails**: Confirmar formato y unicidad
3. **Manejo de errores específicos**: Distinguir entre diferentes tipos de errores de validación
4. **Transacciones**: Asegurar atomicidad en la creación de registros relacionados

## Archivos Modificados

- `src/types/doctor.ts` - Tipos actualizados
- `src/types/patient.ts` - Tipos actualizados  
- `src/hook/doctors/useCreateDoctor.ts` - Transformación de datos
- `src/hook/patients/useCreatePatient.ts` - Transformación de datos
- `src/pages/doctors/DoctorNewPage.tsx` - Formulario completo
- `src/pages/patients/PatientNewPage.tsx` - Formulario completo
