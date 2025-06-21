import { test, expect } from '@playwright/test';

test('Bug: permite registro con correo ya registrado', async ({ page }) => {
  await page.goto('https://farmacorp.com/');
  await page.getByRole('link', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Crear una cuenta' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Juan');
  await page.getByRole('textbox', { name: 'Apellido' }).click();
  await page.getByRole('textbox', { name: 'Apellido' }).fill('López');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('maria.fernandez2025@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
  await page.getByRole('button', { name: 'Crear' }).click();
});