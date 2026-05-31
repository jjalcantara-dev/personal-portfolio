# Plan SEO — jjalcantara.dev

Objetivo: pasar de "portfolio de Backend Engineer" a "referencia profesional en backend con ASP.NET Core y Azure" en los próximos 12 meses.

El cuello de botella ya no es técnico. La infraestructura SEO está bien. El problema es contenido: Google no puede posicionarte como referente porque no tiene suficiente materia técnica que indexar.

---

## Prioridad 1 — Home más fuerte

**Estado actual:** ~200 palabras indexables, todas genéricas. La página con más autoridad del dominio está infrautilizada.

**Objetivo:** añadir 4 bloques de contenido técnico real en la sección "Enfoque", uno por área de especialización. Cada bloque: 80-120 palabras con lenguaje específico y ejemplos concretos de producción.

**Bloques a añadir:**

- **APIs REST** — diseño de contratos OpenAPI/Swagger, ciclo completo desde requisitos hasta soporte en producción, gestión de versiones y breaking changes
- **Cloud & Arquitectura** — Azure Functions vs App Service, event-driven con Storage Queues, decisiones de arquitectura cloud-native con coste operativo
- **Seguridad** — JWT stateless, RBAC por endpoint, OAuth 2.0 (Google/Apple), rate limiting con Redis, security-by-design desde el primer commit
- **Pagos e Integraciones** — Stripe con webhooks e idempotencia, suscripciones nativas App Store y Google Play, validación server-side de receipts

**Keywords objetivo por bloque:**
- APIs: `REST API design ASP.NET Core`, `OpenAPI Swagger .NET backend`
- Cloud: `Azure Functions backend`, `cloud-native ASP.NET Core`, `event-driven architecture Azure`
- Seguridad: `JWT RBAC ASP.NET Core`, `rate limiting Redis .NET`
- Pagos: `Stripe ASP.NET Core`, `Apple IAP backend`, `Google Play subscriptions .NET`

**Esfuerzo estimado:** 1-2 días  
**Impacto SEO:** alto e inmediato — es la URL con más autoridad del dominio

---

## Prioridad 2 — Páginas de proyecto reales

**Estado actual:** tarjetas en `/projects` con 80-120 palabras cada una. No generan autoridad temática individual ni pueden posicionarse para búsquedas específicas.

**Objetivo:** crear URLs dedicadas con 600-800 palabras por proyecto, describiendo problema, arquitectura, decisiones técnicas y resultados.

### `/projects/prodigy-padel-academy`

**Estructura de la página:**
1. Contexto del producto — plataforma de entrenamiento, 3.000+ MAU, iOS + Android
2. Retos técnicos — gamificación en tiempo real, pagos recurrentes, escala
3. Arquitectura — ASP.NET Core + Azure Functions, PostgreSQL, Redis
4. Decisiones clave y trade-offs:
   - Por qué serverless (Azure Functions) sobre App Service
   - Diseño del esquema PostgreSQL para el sistema de gamificación
   - Manejo del ciclo de suscripciones (Stripe + App Store + Google Play) con idempotencia
   - Rate limiting con Redis en endpoints de auth y pago
5. CI/CD — Azure DevOps con SonarCloud

**Keywords objetivo:** `gamification backend ASP.NET Core`, `Stripe subscriptions .NET backend`, `Azure Functions mobile app backend`, `PostgreSQL gamification schema`

---

### `/projects/koru`

**Estructura de la página:**
1. Contexto — app de seguimiento de piel y comunidad, iOS + Android
2. Retos técnicos — arquitectura de datos para tracking visual, autenticación multiproveedor
3. Arquitectura — ASP.NET Core, Azure Functions, PostgreSQL
4. Decisiones clave:
   - Diseño del modelo de datos para seguimiento de factores desencadenantes
   - OAuth 2.0 con Google y Apple: gestión de tokens y refresh
   - Diseño de contratos API para cliente móvil
5. Resultado — en producción con miles de usuarios activos

**Keywords objetivo:** `OAuth 2.0 ASP.NET Core`, `mobile backend API design`, `PostgreSQL user tracking schema`

---

**Esfuerzo estimado:** 3-4 días por página  
**Impacto SEO:** medio-alto — crea URLs dedicadas que compiten en búsquedas técnicas específicas  
**Impacto credibilidad:** alto — muestra pensamiento técnico y trade-offs, no solo stack

---

## Prioridad 3 — Blog técnico

**Objetivo:** 1 artículo al mes. No tutoriales. Casos reales de producción con contexto, decisiones y lecciones aprendidas.

**Formato ideal por artículo:**
- 1.200-2.000 palabras
- Contexto real (de qué producto, qué problema, qué restricciones)
- La decisión técnica y por qué se tomó
- Lo que funcionó y lo que cambiarías
- Sin pasos numerados genéricos

**Backlog inicial:**

| Artículo | Keywords objetivo | Dificultad SEO |
|---|---|---|
| Por qué elegimos Azure Functions para Koru | `Azure Functions vs App Service`, `serverless backend .NET` | Baja |
| Diseñando un sistema de suscripciones Apple y Google en producción | `Apple IAP server-side validation`, `Google Play subscriptions backend` | Muy baja |
| Lecciones tras implementar JWT + RBAC en ASP.NET Core | `JWT RBAC ASP.NET Core`, `stateless auth .NET API` | Baja-media |
| Qué aprendí integrando Stripe en producción | `Stripe webhooks ASP.NET Core`, `Stripe idempotency .NET` | Baja |
| Cómo diseñé el esquema PostgreSQL para un sistema de gamificación | `PostgreSQL gamification schema`, `leaderboard database design` | Muy baja |
| Rate limiting con Redis en endpoints de auth: por qué y cómo | `Redis rate limiting .NET`, `API rate limiting ASP.NET Core` | Baja |
| Event-driven backend con Azure Storage Queues: cuándo usarlo | `Azure Storage Queues vs Service Bus`, `event-driven ASP.NET Core` | Baja |
| Clean Architecture en producción: lo que funciona y lo que no | `Clean Architecture ASP.NET Core`, `SOLID .NET backend` | Media |

**Por qué estos temas:**
- Baja competencia SEO en español para .NET backend
- Alta intención técnica — quien busca "Apple IAP server-side validation .NET" es exactamente el perfil que te interesa conocer
- Los LLMs (ChatGPT, Claude, Perplexity) citan artículos técnicos específicos cuando responden preguntas de ingeniería — cada artículo es una oportunidad de aparecer citado en contexto técnico
- Demuestran expertise real, no declarado

**Impacto estimado a 12 meses con 8-10 artículos:**
- 8-10 URLs nuevas compitiendo por búsquedas técnicas específicas
- Autoridad temática suficiente para que Google asocie el dominio con ASP.NET Core backend
- Posibilidad real de aparecer en AI search cuando alguien pregunte sobre estos temas
- El portfolio pasa de "lista de proyectos" a "recurso técnico de referencia"

---

## Lo que NO hacer

- No escribir artículos genéricos tipo "Qué es una API REST" o "Introducción a Docker" — alta competencia, cero diferenciación
- No publicar sin estructura técnica real — un artículo de 400 palabras sin profundidad hace más daño que no publicar
- No intentar cubrir todos los temas a la vez — profundidad en pocos temas supera amplitud en muchos
- No optimizar más la infraestructura técnica SEO — ya está bien, el retorno marginal es mínimo

---

## Métricas para evaluar progreso

- **Google Search Console**: impresiones y clics para queries técnicas (no de marca personal)
- **Posición media** para "backend engineer ASP.NET Core" y variantes
- **Páginas indexadas** con contenido técnico real
- **Citaciones en AI search** — buscar el nombre en ChatGPT/Perplexity para queries técnicas específicas

---

## Resumen de esfuerzo vs impacto

| Acción | Esfuerzo | Impacto SEO | Impacto credibilidad |
|---|---|---|---|
| Home más fuerte | 1-2 días | Alto / inmediato | Medio |
| Páginas proyecto dedicadas | 1 semana | Medio-alto | Alto |
| Blog técnico (8 artículos) | 8 meses | Muy alto | Muy alto |
