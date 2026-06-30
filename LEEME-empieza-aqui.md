# Empieza aquí — Cómo funcionan los retos y la recompensa

Bienvenida. Vas a construir **tres componentes** que hablan con un backend real.
Al completar los tres, se desbloquea una **recompensa** (un código).

Este documento te dice **qué endpoints existen y en qué orden tocarlos**. No te
dice *cómo* construir los componentes: esa es tu parte.

---

## 0. Antes que nada: autenticación por cookie

Todos los endpoints de los retos (menos el `login`) están **detrás de sesión**.
Si llamas sin estar autenticada, recibes **`401`**.

1. Inicia sesión una vez con `POST {BASE_URL}/login` enviando
   `{ "username": "Andrea", "password": "<tu contraseña>" }`. La respuesta deja
   una cookie llamada `session`.
2. La cookie ya está disponible en tu navegador (te explicaron cómo colocarla a
   mano si hace falta).
3. **Importante:** todos tus `fetch` deben incluir `credentials: 'include'`, o el
   navegador no enviará la cookie y recibirás `401`.

Para depurar tu sesión: `GET {BASE_URL}/me` te devuelve quién eres.

---

## 1. Reto 1 — Tabs

Construye un sistema de pestañas accesible por teclado.

- **Los datos NO son un archivo local: pídelos al backend.**
  `GET {BASE_URL}/challenges/reto1` → devuelve el JSON de las tabs.
- El archivo `reto1-tabs.json` de esta carpeta es solo una **referencia de la
  forma** de la respuesta. La app debe leer del endpoint, no del archivo.
- Pedir este endpoint marca el reto 1 como completado.

## 2. Reto 2 — Dropdown con búsqueda

Construye un selector con búsqueda y lista.

- `GET {BASE_URL}/challenges/reto2` → devuelve el JSON de los items.
- `reto2-dropdown.json` es, otra vez, solo la referencia de la forma.
- Pedir este endpoint marca el reto 2 como completado.

## 3. Reto 3 — Formulario de registro

El reto grande. El contrato completo está en
[`reto3-backend-contract.md`](./reto3-backend-contract.md).

Para que cuente como completo, tu UI tiene que **provocar las tres ramas** del
contrato (que es justo lo que harás al probar tu formulario):

- un **error de campo** (`400`),
- un **error de servidor** (`500`),
- un **registro exitoso** (`201`).

El contrato trae los valores de prueba deterministas para disparar cada una.

---

