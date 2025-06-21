import { test, expect } from "@playwright/test";

test("Validacion al ingresar fecha futura en consulta de facturas", async ({
  page,
}) => {
  await page.goto("https://farmacorp.com/");
  await page.getByRole("link", { name: "Consulta tu factura" }).click();
  await page.goto("https://farmacorp.com/pages/facturacion");
  await page.getByRole("textbox", { name: "Fecha" }).fill("2025-06-30");
  await page.getByRole("textbox", { name: "Documento" }).click();
  await page.getByRole("textbox", { name: "Documento" }).fill("4090320");
  await page.getByText("Buscar").click();
  await page.getByRole("textbox", { name: "Fecha" }).fill("2025-06-01");
  await page.getByText("Buscar").click();
});
