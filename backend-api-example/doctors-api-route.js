/**
 * API Route para creación de doctores
 * Implementación backend siguiendo las notas del usuario
 * 
 * Coloca este archivo en:
 * - Next.js App Router: app/api/doctors/route.js
 * - Next.js Pages Router: pages/api/doctors.js
 */

import { prisma } from '@/lib/prisma' // Ajustar ruta según tu configuración

export async function POST(request) {
  try {
    const data = await request.json()
    
    console.log('📥 Received doctor creation data:', JSON.stringify(data, null, 2))
    
    // Validar que NO hay profileId en los datos (causa del error original)
    if ('profileId' in data) {
      return Response.json({ 
        error: 'Invalid data structure: profileId should not be present when using profile.create',
        details: 'Use profile.create structure instead of profileId'
      }, { status: 400 })
    }
    
    // Validar estructura requerida
    if (!data.profile?.create) {
      return Response.json({ 
        error: 'Missing profile.create structure',
        details: 'Doctor creation requires profile.create with user.create nested'
      }, { status: 400 })
    }
    
    // Verificar email único ANTES de crear
    const existingUser = await prisma.users.findUnique({
      where: { email: data.profile.create.email }
    })
    
    if (existingUser) {
      return Response.json({ 
        error: 'Email already exists',
        details: `A user with email ${data.profile.create.email} already exists`
      }, { status: 409 })
    }
    
    // Crear doctor con estructura anidada correcta
    const newDoctor = await prisma.doctors.create({
      data,
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                validateEmail: true,
                createdAt: true
                // NO incluir password por seguridad
              }
            }
          }
        },
        specialties: {
          include: {
            specialty: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })
    
    console.log('✅ Doctor created successfully:', newDoctor.id)
    
    return Response.json(newDoctor, { status: 201 })
    
  } catch (error) {
    console.error('❌ Error creating doctor:', error)
    
    // Manejo específico de errores de Prisma
    if (error.code === 'P2002') {
      return Response.json({ 
        error: 'Unique constraint violation',
        details: 'Email or license number already exists',
        field: error.meta?.target
      }, { status: 409 })
    }
    
    if (error.code === 'P2003') {
      return Response.json({ 
        error: 'Foreign key constraint failed',
        details: 'Referenced specialty or user does not exist'
      }, { status: 400 })
    }
    
    return Response.json({ 
      error: 'Failed to create doctor',
      details: error.message 
    }, { status: 500 })
  }
}

/**
 * GET - Obtener todos los doctores
 */
export async function GET() {
  try {
    const doctors = await prisma.doctors.findMany({
      where: { deleted: false },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        specialties: {
          include: {
            specialty: {
              include: {
                category: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return Response.json(doctors)
    
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return Response.json({ 
      error: 'Failed to fetch doctors' 
    }, { status: 500 })
  }
}

/**
 * Ejemplo de validación adicional para especialidades
 */
async function validateSpecialties(specialtyIds) {
  if (!specialtyIds || specialtyIds.length === 0) {
    return true // Especialidades opcionales
  }
  
  const existingSpecialties = await prisma.specialties.findMany({
    where: {
      id: { in: specialtyIds },
      deleted: false
    }
  })
  
  if (existingSpecialties.length !== specialtyIds.length) {
    throw new Error('One or more specialties do not exist')
  }
  
  return true
}
