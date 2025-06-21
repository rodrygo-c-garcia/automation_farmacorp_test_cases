/**
 * @author Rodrigo Colque García
 */
import { test, expect } from "@playwright/test";
// NOTE: Hacer Hover en la ocion de "Hogar"
test("Verificar ordenamiento de precios de menor a mayor", async ({ page }) => {
  await page.goto("https://farmacorp.com/");
  await page.getByRole("link", { name: "Mascotas" }).click();
  await page.getByRole("link", { name: "GATOS" }).click();

  // Esperar a que el selector de ordenamiento esté visible
  const ordenarSelect = page.getByLabel("Ordenar por");
  await ordenarSelect.waitFor({ state: "visible" });
  await ordenarSelect.selectOption("price-ascending");

  // Esperar a que la página se actualice después de ordenar
  await page.waitForLoadState("networkidle");

  // Esperar a que la página se actualice y los productos se carguen
  await page.waitForTimeout(5000); // Dar tiempo para que la página se actualice completamente

  // Esperar a que al menos un producto esté visible
  await page.waitForSelector(".productitem .price--main .money", {
    state: "visible",
    timeout: 10000,
  });

  // Obtener los precios de los primeros 5 productos
  const precios = await page.$$eval(
    ".productitem .price--main .money",
    (elements) =>
      elements
        .slice(0, 5)
        .map((el) => {
          // Obtener el texto del precio y limpiarlo
          const precioTexto = el.textContent.trim();

          // Usar una expresión regular para extraer el número // Bs45,5
          const match = precioTexto.match(/Bs\s*([\d,]+)/);
          if (!match) {
            return null;
          }

          const precio = match[1].replace(",", ".");
          return parseFloat(precio);
        })
        .filter((precio) => precio !== null)
  );

  // Obtener también los nombres de los productos para mejor logging
  const nombresProductos = await page.$$eval(
    ".productitem--title a",
    (elements) => elements.slice(0, 5).map((el) => el.textContent.trim())
  );

  // Mostrar los productos y sus precios
  console.log("Productos encontrados:");
  precios.forEach((precio, index) => {
    console.log(`${nombresProductos[index]}: Bs${precio}`);
  });

  // Verificar que tenemos al menos 2 productos para comparar
  expect(precios.length).toBeGreaterThan(1);

  // Verificar que los precios están ordenados de menor a mayor
  for (let i = 0; i < precios.length - 1; i++) {
    const precioActual = precios[i];
    const precioSiguiente = precios[i + 1];

    console.log(
      `Comparando:\n${nombresProductos[i]}: Bs${precioActual}\n${
        nombresProductos[i + 1]
      }: Bs${precioSiguiente}`
    );

    expect(precioActual).toBeLessThanOrEqual(
      precioSiguiente,
      `El precio de "${
        nombresProductos[i]
      }" (Bs${precioActual}) debería ser menor o igual que el precio de "${
        nombresProductos[i + 1]
      }" (Bs${precioSiguiente})`
    );
  }

  // Tomar una captura de pantalla como evidencia
  await page.screenshot({
    path: "precios-ordenados-mascotas.png",
    fullPage: true,
  });
});
