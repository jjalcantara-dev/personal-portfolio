# Portfolio Personal - Jesús Jiménez Alcantara

Portfolio personal profesional desarrollado con Next.js 16, TypeScript y Tailwind CSS. Diseño minimalista, elegante y completamente accesible.

## 🚀 Características

- **Next.js 16** con App Router y SSG (Static Site Generation)
- **TypeScript** para type safety
- **Tailwind CSS 4** para estilos
- **i18n** - Soporte para español e inglés
- **Animaciones profesionales** con scroll-triggered animations
- **Accesibilidad completa** (WCAG 2.1 AA)
- **SEO optimizado** con metadata dinámica
- **Formulario de contacto** integrado con Formspree
- **Responsive design** - Optimizado para todos los dispositivos

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd portfolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Edita `.env.local` y añade tu Formspree ID:
```env
NEXT_PUBLIC_FORMSPREE_ID=tu_formspree_id
```

Para obtener tu Formspree ID:
- Ve a [formspree.io](https://formspree.io)
- Crea una cuenta y un nuevo formulario
- Copia el ID del formulario (ejemplo: `xykyzzbo`)

## 🏃 Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build para Producción

```bash
npm run build
```

Para probar el build localmente:

```bash
npm run start
```

## 📦 Despliegue en Vercel

### Opción 1: Despliegue automático desde GitHub

1. **Prepara el repositorio:**
   - Asegúrate de que todos los cambios estén commiteados
   - Haz push a tu repositorio de GitHub

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio
   - Vercel detectará automáticamente Next.js

3. **Configura las variables de entorno:**
   - En la configuración del proyecto, ve a "Environment Variables"
   - Añade: `NEXT_PUBLIC_FORMSPREE_ID` con tu valor
   - Asegúrate de seleccionar todos los ambientes (Production, Preview, Development)

4. **Despliega:**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará automáticamente
   - Cada push a la rama principal desplegará automáticamente

### Opción 2: Despliegue manual con Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🔧 Configuración Adicional

### Dominio Personalizado

Si tienes un dominio en Cloudflare:

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Añade tu dominio (ej: `jjalcantara.dev`)
3. Configura los registros DNS en Cloudflare según las instrucciones de Vercel

### Variables de Entorno en Vercel

Las variables de entorno se configuran en:
- **Dashboard de Vercel** → Tu Proyecto → Settings → Environment Variables

Añade:
- `NEXT_PUBLIC_FORMSPREE_ID`: Tu ID de Formspree

## 📁 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── [locale]/          # Rutas con i18n
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── puzzles/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/            # Componentes React
├── content/              # Archivos JSON de i18n
├── lib/                  # Utilidades
├── public/               # Assets estáticos
└── middleware.ts         # Middleware para i18n
```

## 🎨 Personalización

### Contenido

El contenido está en archivos JSON:
- `content/es.json` - Contenido en español
- `content/en.json` - Contenido en inglés

### Estilos

Los estilos globales están en `app/globals.css`. El proyecto usa Tailwind CSS 4.

### Logo y Assets

Los assets están en `public/`:
- `logo_final.svg` - Logo principal
- `profile.png` - Foto de perfil

## 🔒 Seguridad y Cumplimiento GDPR

Este proyecto cumple con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea:

- **No se utilizan cookies propias** - El sitio no instala cookies en el dispositivo del usuario
- **Consentimiento explícito** - El formulario de contacto requiere consentimiento explícito antes de enviar datos
- **Política de Privacidad** - Disponible en `/privacy` (español e inglés)
- **Procesamiento de datos** - Los datos del formulario se procesan a través de Formspree, que cumple con GDPR
- **Derechos del usuario** - Los usuarios pueden ejercer sus derechos de acceso, rectificación, supresión, etc.

El formulario de contacto recopila únicamente: nombre, email y mensaje, y solo se utiliza para responder a consultas. No se utilizan para marketing ni se comparten con terceros.

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run start` - Servidor de producción local
- `npm run lint` - Ejecutar ESLint

## 🌐 Internacionalización

El sitio soporta español e inglés. El idioma se detecta automáticamente desde la URL:
- `/es` - Español
- `/en` - Inglés

El middleware redirige automáticamente a `/es` si no se especifica idioma.

## ♿ Accesibilidad

El sitio cumple con WCAG 2.1 nivel AA:
- Navegación por teclado completa
- Screen reader friendly
- Skip links
- ARIA labels apropiados
- Contraste adecuado
- Respeto a `prefers-reduced-motion`

## 📄 Licencia

Este proyecto es privado y personal.

## 👤 Autor

Jesús Jiménez Alcantara - [jjalcantara.dev](https://jjalcantara.dev)
