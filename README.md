# Implementación de CRUD de ordenes en DynamoDB

El sistema debe permitir la gestión completa de ordenes (Crear, Leer, Actualizar, Eliminar) desde la interfaz de usuario, persistiendo los datos en DynamoDB. El objetivo es asegurar que las operaciones CRUD funcionen correctamente y que la infraestructura sea versionada adecuadamente.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 1 semana |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y creación de la API

**Objetivo:** Establecer el entorno de trabajo y crear las rutas básicas de la API para las operaciones CRUD.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Configura el entorno de desarrollo con las herramientas necesarias.
- Crea las rutas de la API para las operaciones CRUD de ordenes.
- Implementa la lógica básica para crear, leer, actualizar y eliminar ordenes.

**Entregable:** API funcional con rutas para CRUD de ordenes.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza Terraform para versionar la infraestructura.
- Implementa validaciones básicas en las operaciones CRUD.

</details>

### Fase 2: Integración con DynamoDB y pruebas unitarias

**Objetivo:** Integrar la API con DynamoDB y escribir pruebas unitarias para asegurar la funcionalidad.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Configura la conexión de la API con DynamoDB.
- Escribe pruebas unitarias para cada operación CRUD.
- Ejecuta las pruebas y asegura que todas pasen.

**Entregable:** API integrada con DynamoDB y pruebas unitarias funcionales.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza Terraform para gestionar la configuración de DynamoDB.
- Implementa pruebas unitarias con cobertura adecuada.

</details>

### Fase 3: Optimización y manejo de errores

**Objetivo:** Optimizar el rendimiento de la API y manejar adecuadamente los errores.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Optimiza las consultas a DynamoDB para mejorar el rendimiento.
- Implementa un manejo adecuado de errores en la API.
- Prueba el sistema con diferentes escenarios de error.

**Entregable:** API optimizada y con manejo de errores robusto.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza índices y particiones en DynamoDB para mejorar el rendimiento.
- Implementa logging y monitoreo para facilitar la depuración de errores.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD en el contexto de DynamoDB?
- **paraQueSirve**: ¿Para qué sirve versionar la infraestructura con Terraform en este reto?
- **comoSeUsa**: ¿Cómo se usa DynamoDB para persistir ordenes en este sistema?
- **erroresComunes**: ¿Cuáles son los errores comunes al integrar una API con DynamoDB y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica optimizar el rendimiento de una consulta a DynamoDB?

## Criterios de Evaluacion

- Implementación correcta de las rutas de la API para las operaciones CRUD.
- Integración funcional de la API con DynamoDB.
- Pruebas unitarias efectivas para cada operación CRUD.
- Optimización adecuada de las consultas a DynamoDB.
- Manejo robusto de errores en la API.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
