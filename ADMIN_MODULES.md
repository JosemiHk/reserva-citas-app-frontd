# Módulos Administrativos - Frontend

Este documento describe la implementación de los módulos administrativos para el sistema de reserva de citas médicas.

## Módulos Implementados

### 1. Especialidades

#### Componentes:
- **SpecialtyPage**: Vista principal que lista todas las especialidades
- **SpecialtyCard**: Tarjeta individual para mostrar información de especialidad
- **SpecialtyDetailPage**: Vista detallada de una especialidad específica
- **SpecialtyNewPage**: Formulario para crear nueva especialidad

#### Hooks:
- `useSpecialties()`: Obtiene lista de especialidades
- `useSpecialtyById(id)`: Obtiene especialidad por ID
- `useCreateSpecialty()`: Crea nueva especialidad

#### Rutas:
- `/admin/specialties` - Lista de especialidades
- `/admin/specialties/:id/detail` - Detalle de especialidad
- `/admin/specialties/new` - Crear especialidad

### 2. Médicos

#### Componentes:
- **DoctorPage**: Vista principal que lista todos los médicos
- **DoctorCard**: Tarjeta individual para mostrar información del médico
- **DoctorDetailPage**: Vista detallada de un médico específico
- **DoctorNewPage**: Formulario para registrar nuevo médico

#### Hooks:
- `useDoctors()`: Obtiene lista de médicos
- `useDoctorById(id)`: Obtiene médico por ID
- `useCreateDoctor()`: Registra nuevo médico

#### Rutas:
- `/admin/doctors` - Lista de médicos
- `/admin/doctors/:id/detail` - Detalle de médico
- `/admin/doctors/new` - Registrar médico

### 3. Pacientes

#### Componentes:
- **PatientPage**: Vista principal que lista todos los pacientes
- **PatientCard**: Tarjeta individual para mostrar información del paciente
- **PatientDetailPage**: Vista detallada de un paciente específico
- **PatientNewPage**: Formulario para registrar nuevo paciente

#### Hooks:
- `usePatients()`: Obtiene lista de pacientes
- `usePatientById(id)`: Obtiene paciente por ID
- `useCreatePatient()`: Registra nuevo paciente

#### Rutas:
- `/admin/patients` - Lista de pacientes
- `/admin/patients/:id/detail` - Detalle de paciente
- `/admin/patients/new` - Registrar paciente

## Características Implementadas

### Diseño Consistente
- Uso de Material-UI para componentes visuales
- Paleta de colores institucional del hospital
- Tipografía y espaciado consistente
- Diseño responsive y accesible

### Funcionalidades CRUD
- **Listar**: Visualización en tarjetas con información relevante
- **Crear**: Formularios completos para nuevos registros
- **Leer**: Páginas de detalle con información completa
- **Actualizar**: Estructura preparada para edición (botones implementados)
- **Eliminar**: Estructura preparada (soft delete mediante campo `deleted`)

### Integración con Backend
- Hooks basados en React Query para manejo de estado
- Tipos TypeScript basados en el esquema Prisma
- Servicios API configurados para endpoints REST

### Características Específicas por Módulo

#### Especialidades
- Vinculación con categorías
- Visualización de categoría padre
- Estado activo/inactivo

#### Médicos
- Información profesional (número de licencia, resumen)
- Múltiples especialidades por médico
- Foto de perfil y datos de contacto
- Chips para mostrar especialidades

#### Pacientes
- Información médica (tipo de sangre, alergias, condiciones crónicas)
- Contacto de emergencia
- Documentos de identidad
- Cálculo automático de edad
- Información demográfica completa

## Estructura de Archivos

```
src/
├── components/
│   ├── specialty/
│   │   └── SpecialtyCard.tsx
│   ├── doctor/
│   │   └── DoctorCard.tsx
│   └── patient/
│       └── PatientCard.tsx
├── pages/
│   ├── specialties/
│   │   ├── SpecialtyPage.tsx
│   │   ├── SpecialtyDetailPage.tsx
│   │   └── SpecialtyNewPage.tsx
│   ├── doctors/
│   │   ├── DoctorPage.tsx
│   │   ├── DoctorDetailPage.tsx
│   │   └── DoctorNewPage.tsx
│   └── patients/
│       ├── PatientPage.tsx
│       ├── PatientDetailPage.tsx
│       └── PatientNewPage.tsx
├── hook/
│   ├── specialties/
│   │   ├── useSpecialties.ts
│   │   ├── useSpecialtyById.ts
│   │   └── useCreateSpecialty.ts
│   ├── doctors/
│   │   ├── useDoctors.ts
│   │   ├── useDoctorById.ts
│   │   └── useCreateDoctor.ts
│   └── patients/
│       ├── usePatients.ts
│       ├── usePatientById.ts
│       └── useCreatePatient.ts
└── types/
    ├── specialty.ts
    ├── doctor.ts
    └── patient.ts
```

## Próximos Pasos

1. **Implementar funcionalidad de edición**:
   - Crear hooks `useUpdateSpecialty`, `useUpdateDoctor`, `useUpdatePatient`
   - Crear páginas de edición para cada módulo

2. **Implementar funcionalidad de eliminación**:
   - Crear hooks `useDeleteSpecialty`, `useDeleteDoctor`, `useDeletePatient`
   - Agregar modales de confirmación

3. **Mejorar la experiencia de usuario**:
   - Agregar filtros y búsqueda
   - Implementar paginación
   - Agregar indicadores de carga y estados vacíos

4. **Validaciones**:
   - Agregar validación de formularios
   - Implementar mensajes de error específicos

5. **Testing**:
   - Agregar tests unitarios para componentes
   - Implementar tests de integración

## Tecnologías Utilizadas

- **React 18** con TypeScript
- **Material-UI** para componentes visuales
- **React Query** para manejo de estado del servidor
- **React Router** para navegación
- **Vite** como bundler de desarrollo
