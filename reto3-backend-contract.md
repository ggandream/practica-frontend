# Contrato del Backend — Reto 3 (Form + Fetch)

Este documento define el contrato que el frontend (el form del aprendiz) espera del backend de práctica. El mentor implementa el backend; el aprendiz programa contra este contrato.

La meta pedagógica del reto es que el aprendiz maneje **asincronía, estados de carga/error y errores a nivel de campo**. Por eso el backend está diseñado a propósito para *forzar* esos casos, no para ser amable.

---

## Base

- **Base URL:** la del backend desplegado (te la da el mentor).
- **Formato:** JSON en request y response (`Content-Type: application/json`).
- **Latencia simulada:** todos los endpoints esperan **~800 ms** antes de responder, para que el aprendiz tenga que manejar el estado de *loading* de verdad.

> **Autenticación (importante):** `POST /register` está **detrás de sesión**, igual que el resto de los retos. Tu `fetch` debe incluir `credentials: 'include'` y debes tener la cookie `session` activa (ver [`LEEME-empieza-aqui.md`](./LEEME-empieza-aqui.md)). Sin esto recibirás **`401`** antes de llegar a cualquier validación.

---

## Endpoint principal — Registro

### `POST /register`

Crea un usuario. Es el endpoint contra el que se envía el form.

**Request body:**

```json
{
  "username": "ada",
  "email": "ada@example.com",
  "password": "secret123"
}
```

> Nota de diseño: el campo `confirmPassword` del formulario se valida **solo en el cliente** y **no se envía** al backend. Es puramente UX. Buen punto para que el aprendiz entienda qué validaciones son del cliente y cuáles del servidor.

**Reglas de validación (el servidor revalida todo):**

| Campo      | Regla                                             |
|------------|---------------------------------------------------|
| `username` | requerido, mínimo 3 caracteres, único             |
| `email`    | requerido, formato de email válido, único         |
| `password` | requerido, mínimo 8 caracteres                    |

---

### Respuestas

#### ✅ Éxito — `201 Created`

```json
{
  "id": "u_1a2b3c",
  "username": "ada",
  "email": "ada@example.com"
}
```

La respuesta **nunca** incluye el `password`. (Otro buen punto de conversación.)

#### ❌ Error de validación — `400 Bad Request`

Errores **a nivel de campo**. Solo se incluyen los campos que fallaron. Esta es la lección clave del reto: mapear estos errores de vuelta al input correspondiente.

```json
{
  "errors": {
    "email": "Este correo ya está registrado",
    "username": "Este usuario ya está en uso"
  }
}
```

#### ❌ Error del servidor — `500 Internal Server Error`

```json
{
  "message": "Error interno del servidor. Intenta de nuevo."
}
```

El backend devuelve un 500 **de forma aleatoria (~15% de las peticiones)** para que el estado de error no sea decorativo y el aprendiz tenga que manejar el reintento.

#### ❌ Fallo de red

No es una respuesta del servidor: ocurre si el backend está apagado o no hay conexión. Aquí `fetch` **sí** rechaza la promesa (cae en el `catch`). Importante que el aprendiz distinga esto de un 4xx/5xx, donde `fetch` resuelve normal y hay que comprobar `res.ok`.

---

## Valores de prueba deterministas

Para que el aprendiz pueda disparar cada caso a voluntad mientras prueba, el backend reconoce estos valores reservados:

| Si envía…                          | El backend responde…                                  |
|------------------------------------|-------------------------------------------------------|
| `email` = `taken@example.com`      | `400` con error de campo en `email` (ya registrado)   |
| `username` = `admin`               | `400` con error de campo en `username` (ya en uso)    |
| `email` = `error@example.com`      | `500` (fuerza el error de servidor para probar)       |
| cualquier otro valor válido        | `201` éxito                                            |

Así puede probar cada rama (éxito, error de campo, error de servidor) sin depender del azar del 15%.

---

## Resumen de códigos de estado

| Código | Significado                          | El cliente debe…                                |
|--------|--------------------------------------|-------------------------------------------------|
| `201`  | Usuario creado                       | mostrar éxito, limpiar el form                  |
| `400`  | Validación fallida (errores de campo)| mapear `errors` a cada input                    |
| `401`  | No autenticado (falta la cookie)     | revisar sesión y `credentials: 'include'`       |
| `500`  | Error del servidor                   | mostrar mensaje general, permitir reintento     |
| —      | Fallo de red (sin respuesta)         | capturar en el `catch`, mostrar mensaje de red  |

---

## Checklist de lo que el cliente debe manejar

- [ ] Validación de cliente **a mano** antes de enviar (requeridos, formato email, `password === confirmPassword`).
- [ ] `if (!res.ok)` — `fetch` no lanza con 4xx/5xx.
- [ ] `await res.json()` — es asíncrono.
- [ ] Estado de **loading**: deshabilitar el botón durante el `await`.
- [ ] Evitar **doble-submit** (el botón deshabilitado ya lo cubre).
- [ ] Mapear `errors` del 400 a cada input.
- [ ] Mensaje distinto para error de red vs error de servidor.
- [ ] Resetear errores previos al reintentar.
