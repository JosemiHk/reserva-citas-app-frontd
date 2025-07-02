import { test, expect } from '@playwright/test'

// Test para validar la creación de médicos
test.describe('Doctor Creation Flow', () => {
  test('should create doctor with correct data structure', async ({ page }) => {
    // Interceptar la llamada API para verificar la estructura de datos
    await page.route('**/api/doctors', async (route) => {
      const request = route.request()
      const postData = request.postDataJSON()
      
      // Verificar estructura correcta
      expect(postData).toHaveProperty('licenseNumber')
      expect(postData).toHaveProperty('profile.create')
      expect(postData.profile.create).toHaveProperty('name')
      expect(postData.profile.create).toHaveProperty('email')
      expect(postData.profile.create).toHaveProperty('user.create')
      expect(postData.profile.create.user.create).toHaveProperty('role', 'DOCTOR')
      
      // No debe tener profileId
      expect(postData).not.toHaveProperty('profileId')
      
      // Simular respuesta exitosa
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          licenseNumber: postData.licenseNumber,
          profile: {
            id: 1,
            name: postData.profile.create.name,
            lastName: postData.profile.create.lastName,
            email: postData.profile.create.email
          }
        })
      })
    })

    await page.goto('/admin/doctors/new')
    
    // Llenar formulario
    await page.fill('[data-testid="name"]', 'Molly')
    await page.fill('[data-testid="lastName"]', 'Saltibañez')
    await page.fill('[data-testid="email"]', 'mollsal@sisol.gob.pe')
    await page.fill('[data-testid="phone"]', '985632147')
    await page.fill('[data-testid="licenseNumber"]', '880862431')
    await page.fill('[data-testid="resume"]', 'Medico graduado de la Sideral Carrion')
    
    // Enviar formulario
    await page.click('[data-testid="submit-button"]')
    
    // Verificar redirección exitosa
    await expect(page).toHaveURL('/admin/doctors')
  })
})

// Test para validar la creación de pacientes
test.describe('Patient Creation Flow', () => {
  test('should create patient with correct data structure', async ({ page }) => {
    await page.route('**/api/patients', async (route) => {
      const request = route.request()
      const postData = request.postDataJSON()
      
      // Verificar estructura correcta
      expect(postData).toHaveProperty('emergencyContact')
      expect(postData).toHaveProperty('bloodType')
      expect(postData).toHaveProperty('profile.create')
      expect(postData.profile.create).toHaveProperty('user.create')
      expect(postData.profile.create.user.create).toHaveProperty('role', 'PATIENT')
      
      // No debe tener profileId
      expect(postData).not.toHaveProperty('profileId')
      
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          emergencyContact: postData.emergencyContact,
          bloodType: postData.bloodType,
          profile: {
            id: 1,
            name: postData.profile.create.name,
            lastName: postData.profile.create.lastName,
            email: postData.profile.create.email
          }
        })
      })
    })

    await page.goto('/admin/patients/new')
    
    // Llenar formulario básico
    await page.fill('[data-testid="name"]', 'Ana')
    await page.fill('[data-testid="lastName"]', 'García')
    await page.fill('[data-testid="email"]', 'ana.garcia@email.com')
    await page.fill('[data-testid="emergencyContact"]', 'Juan Pérez - 987654321')
    await page.selectOption('[data-testid="bloodType"]', 'O+')
    
    await page.click('[data-testid="submit-button"]')
    await expect(page).toHaveURL('/admin/patients')
  })
})
