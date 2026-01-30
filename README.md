# 🚀 Aionia - Transformando Operaciones Digitales

[![Website](https://img.shields.io/badge/Website-aionia.com.mx-yellow)](https://aionia.com.mx/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Sitio web corporativo de Aionia - Soluciones modulares que transforman tu operación en un entorno digital escalable.

## 📋 Descripción

Aionia ofrece servicios de consultoría, desarrollo, integración y soporte 24/7 para empresas que buscan digitalizar y automatizar sus operaciones. Este repositorio contiene el código fuente del sitio web corporativo.

## ✨ Características

- **Diseño Moderno**: Interfaz oscura con gradientes vibrantes y micro-animaciones
- **Logo Animado**: Efecto de escritura con cursor parpadeante
- **Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Sistema Modular**: Configurador interactivo de módulos de servicio
- **Formulario de Contacto**: Sistema de consultoría con validación
- **SEO Optimizado**: Meta tags, estructura semántica y performance optimizada

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones y gradientes
- **JavaScript ES6+**: Smooth scrolling, formularios interactivos, intersection observers
- **Google Fonts**: Inter (UI) y Space Mono (Logo)

## 📁 Estructura del Proyecto

```
AIONIA/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # Funcionalidad JavaScript
├── assets/             # Imágenes, iconos y recursos
├── README.md           # Este archivo
└── .gitignore          # Archivos ignorados por Git
```

## 🚀 Instalación y Uso

### Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/aionia-website.git
cd aionia-website
```

### Visualización Local

Simplemente abre el archivo `index.html` en tu navegador preferido:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

O usa un servidor local para desarrollo:

```bash
# Python 3
python -m http.server 8000

# Node.js (usando npx)
npx http-server

# PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## 🎨 Personalización

### Colores

Los colores principales se definen en `:root` dentro de `css/styles.css`:

```css
:root {
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    --accent-yellow: #FFD93D;
    --accent-blue: #3B82F6;
    --accent-purple: #8B5CF6;
}
```

### Contenido

- **Servicios**: Edita la sección `#services` en `index.html`
- **Beneficios**: Modifica la sección `#benefits`
- **Módulos**: Actualiza la sección `.configuration`
- **Formulario**: Configura el endpoint del formulario en `js/main.js`

## 📧 Integración de Formulario

El formulario actualmente muestra un mensaje de confirmación. Para integrarlo con un backend:

1. Abre `js/main.js`
2. Descomenta el código de fetch en el evento de submit
3. Actualiza el endpoint `/api/consultation` con tu URL de API

```javascript
fetch('/api/consultation', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
```

## 🌐 Deployment

### GitHub Pages

1. Sube el código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Guarda y espera unos minutos

### Netlify / Vercel

```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

### Servidor Tradicional

Sube todos los archivos via FTP/SFTP a tu directorio web (`public_html`, `www`, etc.)

### Dokploy

Este proyecto está configurado para deployment automático en Dokploy usando Docker.

**Pre-requisitos:**
- Cuenta de Dokploy activa
- Acceso al repositorio GitHub

**Pasos:**

1. **Crear Nuevo Proyecto en Dokploy**
   - Ingresa a tu panel de Dokploy
   - Click en "Create Project"
   - Selecciona "Application"

2. **Configurar Repositorio**
   - Repository URL: `https://github.com/angeladcl/AIONIA-2.0.git`
   - Branch: `main`
   - Build Method: `Dockerfile`

3. **Configurar Puertos**
   - Container Port: `80`
   - External Port: Asignado automáticamente por Dokploy

4. **Deploy**
   - Click en "Deploy"
   - Espera a que el build complete (2-3 minutos)
   - Dokploy asignará un dominio temporal (ej: `aionia-xxxxx.dokploy.app`)

5. **Configurar Dominio Personalizado** (Opcional)
   - En la configuración del proyecto, ve a "Domains"
   - Añade `aionia.com.mx`
   - Configura los registros DNS en tu proveedor:
     - `A` record apuntando a la IP de Dokploy
     - O `CNAME` record según indique Dokploy
   - Habilita SSL automático (Let's Encrypt)

**Características del Deployment:**
- ✅ Build automático desde Dockerfile
- ✅ Nginx optimizado con compresión gzip
- ✅ Headers de seguridad configurados
- ✅ Cache de assets estáticos (1 año)
- ✅ SSL/TLS automático
- ✅ Zero downtime deployments

**Variables de Entorno:**
No se requieren variables de entorno para este proyecto.

## 📈 Optimizaciones Futuras

- [ ] Implementar backend para formulario de contacto
- [ ] Añadir logos de clientes reales
- [ ] Implementar Google Analytics o alternativa
- [ ] Optimizar imágenes con lazy loading
- [ ] Añadir tests automatizados
- [ ] Implementar sistema de blog
- [ ] Añadir multi-idioma (ES/EN)
- [ ] PWA (Progressive Web App)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Aionia**
- Website: [https://aionia.com.mx/](https://aionia.com.mx/)
- Email: contacto@aionia.com.mx

---

Hecho con ❤️ por el equipo de Aionia
