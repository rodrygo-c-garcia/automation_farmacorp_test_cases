# Pruebas Automatizadas para Farmacorp.com

## Descripción
Este repositorio contiene una suite de pruebas automatizadas para el sitio web de Farmacorp utilizando Playwright. Las pruebas están diseñadas para verificar diferentes funcionalidades del sitio de comercio electrónico.

## Casos de Prueba
El proyecto incluye los siguientes casos de prueba:

1. **Ordenamiento de Precios**
   - Verifica que los productos se ordenen correctamente de menor a mayor precio
   - Ubicación: `tests/farmacorp/tc_ordenamiento-precios.spec.js`

2. **Filtrado de Productos**
   - Valida la funcionalidad de filtros de productos
   - Ubicación: `tests/farmacorp/tc_filtrar_productos.spec.js`

3. **Registro de Correo**
   - Prueba el proceso de registro de usuarios
   - Ubicación: `tests/farmacorp/tc_registro_correo.spec.js`

4. **Validación de Fecha Futura**
   - Verifica la validación de fechas en el sistema
   - Ubicación: `tests/farmacorp/tc_validacion_fecha_futura.spec.js`

## Tecnologías Utilizadas
- Playwright
- JavaScript
- Node.js

## Configuración del Proyecto

1. Instalar dependencias:
```sh
npm install
```

2. Ejecutar las pruebas:
```sh
npx playwright test
```

3. Ver reporte de pruebas:
```sh
npx playwright show-report
```

## Autor
Ariel Rodrigo Colque Garcia

## Licencia
MIT
