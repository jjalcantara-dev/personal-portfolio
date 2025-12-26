# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu portfolio en Vercel mediante GitHub.

## 📋 Checklist Pre-Despliegue

- [x] ✅ Build funciona correctamente (`npm run build`)
- [x] ✅ Linting sin errores (`npm run lint`)
- [x] ✅ Variables de entorno documentadas
- [x] ✅ Configuración de Next.js optimizada
- [x] ✅ No se requieren cookies (Formspree maneja los datos)

## 🔧 Paso 1: Preparar el Repositorio

1. **Asegúrate de que todos los cambios estén commiteados:**
```bash
git add .
git commit -m "Preparado para producción"
```

2. **Haz push a GitHub:**
```bash
git push origin main
# o tu rama principal
```

## 🔗 Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Si es tu primera vez, conéctate con tu cuenta de GitHub
3. Haz clic en **"Add New Project"**
4. Selecciona tu repositorio `portfolio`
5. Vercel detectará automáticamente:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

## ⚙️ Paso 3: Configurar Variables de Entorno

**IMPORTANTE:** Antes de hacer deploy, configura las variables de entorno:

1. En la pantalla de configuración del proyecto, busca **"Environment Variables"**
2. Añade la siguiente variable:

| Variable | Valor | Ambientes |
|----------|-------|-----------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Tu ID de Formspree (ej: `xykyzzbo`) | Production, Preview, Development |

3. **Asegúrate de seleccionar todos los ambientes** (Production, Preview, Development)

### Obtener tu Formspree ID:

1. Ve a [formspree.io](https://formspree.io)
2. Inicia sesión o crea una cuenta
3. Crea un nuevo formulario
4. Copia el ID del formulario (aparece en la URL: `https://formspree.io/f/xykyzzbo`)
5. Configura el email de destino en Formspree (ej: `contact@jjalcantara.dev`)

## 🚀 Paso 4: Desplegar

1. Haz clic en **"Deploy"**
2. Vercel construirá tu proyecto automáticamente
3. Una vez completado, tendrás una URL como: `tu-proyecto.vercel.app`

## 🌐 Paso 5: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio (ej: `jjalcantara.dev`):

1. En Vercel, ve a tu proyecto → **Settings** → **Domains**
2. Añade tu dominio: `jjalcantara.dev` y `www.jjalcantara.dev`
3. Vercel te dará instrucciones para configurar DNS en Cloudflare:

### Configuración DNS en Cloudflare:

1. Ve a tu panel de Cloudflare
2. Selecciona tu dominio
3. Ve a **DNS** → **Records**
4. Añade los registros que Vercel te indique:

**Para el dominio principal:**
- Tipo: `A`
- Nombre: `@`
- Contenido: IP que Vercel te proporcione
- Proxy: Activado (nube naranja)

**Para www:**
- Tipo: `CNAME`
- Nombre: `www`
- Contenido: `cname.vercel-dns.com`
- Proxy: Activado

5. Espera unos minutos a que se propaguen los cambios DNS

## 🔄 Despliegues Automáticos

Una vez configurado, cada push a tu rama principal desplegará automáticamente:

- **Production:** Push a `main` o `master`
- **Preview:** Push a otras ramas o Pull Requests

## ✅ Verificación Post-Despliegue

Después del despliegue, verifica:

1. ✅ El sitio carga correctamente
2. ✅ Los idiomas funcionan (`/es` y `/en`)
3. ✅ El formulario de contacto funciona
4. ✅ Las animaciones funcionan
5. ✅ El sitio es responsive
6. ✅ El SEO está correcto (verifica con herramientas como [PageSpeed Insights](https://pagespeed.web.dev/))

## 🐛 Solución de Problemas

### El formulario no funciona
- Verifica que `NEXT_PUBLIC_FORMSPREE_ID` esté configurada en Vercel
- Verifica que el ID sea correcto en Formspree
- Revisa la consola del navegador para errores

### El build falla
- Verifica los logs en Vercel
- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que no haya errores de TypeScript localmente

### El dominio no funciona
- Espera hasta 48 horas para la propagación DNS
- Verifica que los registros DNS estén correctos en Cloudflare
- Asegúrate de que el proxy esté activado en Cloudflare

## 📊 Monitoreo

Vercel proporciona:
- Analytics (opcional, requiere plan)
- Logs de build y runtime
- Métricas de rendimiento

## 🔒 Seguridad

- ✅ No se requieren cookies
- ✅ Headers de seguridad configurados en `next.config.ts`
- ✅ Formspree maneja los datos del formulario de forma segura

## 📝 Notas Importantes

- **No commitees `.env.local`** - Está en `.gitignore`
- **Las variables de entorno en Vercel** son necesarias para que el formulario funcione
- **El sitio es completamente estático** (SSG), por lo que es muy rápido
- **No se requiere base de datos** ni backend

## 🎉 ¡Listo!

Tu portfolio está desplegado y funcionando. Cada cambio que hagas y subas a GitHub se desplegará automáticamente.

