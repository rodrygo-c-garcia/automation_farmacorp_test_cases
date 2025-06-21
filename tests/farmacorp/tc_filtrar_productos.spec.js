import { test, expect } from "@playwright/test";

test.use({
  launchOptions: {
    slowMo: 1000,
  },
});

test("Filtrar productos de bebidas por categoría y palabra clave", async ({
  page,
}) => {
  await page.goto("https://farmacorp.com/");
  await page.waitForTimeout(2000);

  await page.getByRole("textbox", { name: "Buscar" }).click();
  await page.waitForTimeout(1000);

  await page.getByRole("textbox", { name: "Buscar" }).fill("agua");
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "Buscar" }).click();
  await page.waitForTimeout(2000);

  await page.waitForLoadState("networkidle");
});
