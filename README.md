# 🐝 Sistema de Avisaje Apícola - SAG Chile

Sistema web completo para el aviso de aplicaciones de plaguicidas tóxicos para abejas, conectado con la base de datos oficial del SAG (Servicio Agrícola y Ganadero) de Chile.

## 🌟 Características Principales

### 📱 Diseño Responsive
- **Interfaz optimizada para móviles y tablets**
- Menú hamburguesa para navegación en dispositivos móviles
- Tablas adaptativas que ocultan columnas menos importantes en pantallas pequeñas
- Touch targets de 44px mínimo para mejor experiencia táctil
- Prevención de zoom automático en inputs en iOS
- Scroll suave con `-webkit-overflow-scrolling: touch`

### 🎨 Logo Profesional
- Logo SVG personalizado con diseño agrícola elegante
- Abeja estilizada con espigas de trigo
- Gradientes verdes y dorados que representan la agricultura y la apicultura
- Escalable a cualquier tamaño sin pérdida de calidad

### 🗺️ Gestión de Campos con Coordenadas
- Registro de campos agrícolas con coordenadas GPS
- Geolocalización automática del dispositivo
- Validación de coordenadas dentro del rango de Chile
- Cálculo automático de distancia a apiarios
- Visualización en mapa interactivo

### 🐝 Base de Datos de Apicultores SIPEC
- **60 apicultores de ejemplo** distribuidos en las 16 regiones de Chile
- Datos oficiales del Boletín Apícola N°8 del SAG (mayo 2023)
- Estadísticas completas:
  - 10,504 apicultores registrados
  - 20,150 apiarios
  - 1,404,214 colmenas
- Estimación de apicultores no registrados (~1,750)
- Tipología de apicultores (AFC, Mediana, Grande, Muy Grande)

### 🧪 Base de Datos de Productos SAG
- **750+ productos fitosanitarios** clasificados
- Clasificación ecotoxicológica según Res. 7068/2024
- Categorías de toxicidad:
  - Muy tóxico (< 2 μg/abeja)
  - Tóxico (2-10.99 μg/abeja)
  - Moderadamente tóxico (11-25 μg/abeja)
  - Ligeramente tóxico (26-100 μg/abeja)
  - Virtualmente no tóxico (> 100 μg/abeja)

### 📨 Sistema de Avisos
- **Envío por WhatsApp** con mensajes pre-llenados
- **Envío por correo electrónico** con plantillas HTML profesionales
- Vista previa de mensajes antes de enviar
- Historial completo de avisos enviados
- Plantillas personalizables con variables dinámicas

### 👥 Sistema de Usuarios
- Registro con datos completos (nombre, email, teléfono, región, comuna)
- Tres roles: Aplicador, Apicultor, Asesor Técnico
- Perfil editable con estadísticas personales
- Sesión persistente con localStorage

## 📊 Estadísticas Nacionales (SAG 2023)

### Distribución por Región
| Región | Apicultores | Apiarios | Colmenas |
|--------|-------------|----------|----------|
| Araucanía | 1,814 | 2,628 | 124,945 |
| Maule | 1,720 | 3,699 | 292,853 |
| Biobío | 1,246 | 2,129 | 98,392 |
| O'Higgins | 1,166 | 2,684 | 260,733 |
| Metropolitana | 850 | 1,548 | 152,507 |
| Ñuble | 814 | 1,477 | 97,346 |
| Los Lagos | 721 | 1,851 | 135,610 |
| Valparaíso | 700 | 1,588 | 126,967 |
| Los Ríos | 572 | 1,085 | 62,847 |
| Coquimbo | 590 | 977 | 46,265 |
| Atacama | 101 | 203 | 2,868 |
| Aysén | 123 | 180 | 2,233 |
| Antofagasta | 36 | 41 | 245 |
| Tarapacá | 30 | 37 | 283 |
| Arica y Parinacota | 18 | 20 | 111 |
| Magallanes | 3 | 3 | 9 |

### Tipología de Apicultores
- **AFC (Apicultura Familiar Campesina)**: 88.86% (1-299 colmenas)
- **Mediana**: 8.25% (300-799 colmenas)
- **Grande**: 2.00% (800-1,499 colmenas)
- **Muy Grande**: 0.89% (>1,500 colmenas)

### Actividades Apícolas
- Producción de miel: 97.9%
- Polinización: 25.59%
- Venta de material vivo: 16.17%
- Propóleo: 7.20%
- Polen: 6.59%
- Producción de cera: 5.60%
- Jalea real: 3.22%
- Apiterapia: 1.99%

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- npm o yarn
- Navegador web moderno

### Instalación
```bash
# Clonar el repositorio
git clone <repo-url>
cd sag-avisaje

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

### Estructura del Proyecto
```
src/
├── components/
│   ├── AuthScreen.tsx       # Pantalla de login/registro
│   ├── UserProfile.tsx      # Perfil de usuario
│   ├── CampoManager.tsx     # Gestión de campos
│   └── MapView.tsx          # Mapa interactivo
├── data/
│   ├── sagProducts.ts       # Base de datos principal SAG
│   ├── sagProductsExtra.ts  # Productos complementarios
│   ├── sagProductsMas.ts    # Productos adicionales
│   ├── apicultoresSIPEC.ts  # Apicultores por región
│   └── fields.ts            # Campos y apiarios
├── services/
│   ├── userService.ts       # Gestión de usuarios y avisos
│   └── campoService.ts      # Gestión de campos
├── types/
│   ├── user.ts              # Tipos de usuario
│   └── fields.ts            # Tipos de campos
└── App.tsx                  # Componente principal
```

## 📱 Flujo de Uso

### 1. Registro de Usuario
- Ingresar datos personales
- Seleccionar región y comuna
- Elegir rol (Aplicador, Apicultor, Asesor)

### 2. Registro de Campos
- Ir a "Mis Campos"
- Click en "Registrar Nuevo Campo"
- Ingresar nombre del campo
- Obtener coordenadas con GPS o ingresar manualmente
- Completar región, comuna, hectáreas, cultivo
- Guardar campo

### 3. Selección de Producto
- Ir a "Productos SAG"
- Buscar producto por nombre o N° SAG
- Filtrar por toxicidad
- Click en "Usar" para seleccionar

### 4. Configuración del Aviso
- Ir a "Avisaje"
- Seleccionar campo registrado
- Configurar fecha (mínimo 48h anticipación)
- Seleccionar horario de baja actividad de abejas
- Sistema muestra automáticamente apicultores en zona de 3 km

### 5. Envío de Avisos
- Seleccionar medio de envío (WhatsApp, Email o ambos)
- Vista previa del mensaje
- Click en "Enviar Avisos"
- Se abren ventanas de WhatsApp/Email para cada apicultor
- Usuario confirma envío manualmente
- Aviso se registra en historial

## 🔗 Enlaces Oficiales SAG

- **Sistema CPA**: https://cpa.sag.gob.cl
- **SIPEC Apícola**: https://sipecweb.sag.gob.cl
- **Power BI SAG**: Base de datos completa de productos
- **Planilla Plaguicidas**: http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados

## 📜 Marco Legal

- **Ley Apícola N°21.489** - Promulgada el 4 de octubre de 2022
- **Resolución Exenta N°7068/2024** - Clasificación ecotoxicológica
- **Obligación de avisaje**: 48 horas de anticipación
- **Zona de influencia**: 3 km desde el campo de aplicación
- **Medios verificables**: Email, SMS, escrito presencial

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Leaflet** - Mapas interactivos
- **Vite** - Build tool
- **LocalStorage** - Persistencia de datos

## 📊 Mejoras Recientes

### Versión 2.0
- ✅ Diseño completamente responsive para móviles
- ✅ Menú hamburguesa para navegación móvil
- ✅ Logo SVG profesional con diseño agrícola
- ✅ Tablas adaptativas que ocultan columnas en móviles
- ✅ Touch targets optimizados (44px mínimo)
- ✅ Prevención de zoom en inputs iOS
- ✅ Scroll suave en dispositivos táctiles
- ✅ 60 apicultores de ejemplo en todas las regiones
- ✅ Estadísticas oficiales completas del SAG
- ✅ Estimación de apicultores no registrados
- ✅ Información sobre tipología y actividades
- ✅ Datos de género y exportadores RAMEX

## 🔒 Seguridad y Privacidad

### Almacenamiento de Datos
- Usuarios: LocalStorage del navegador
- Campos: LocalStorage del navegador
- Avisos: LocalStorage del navegador
- Base de datos SAG: Archivos estáticos

### Recomendaciones para Producción
- Backend con base de datos (PostgreSQL, MongoDB)
- Autenticación con JWT o OAuth2
- API de WhatsApp Business para envío automático
- Servicio SMTP para correos
- HTTPS obligatorio
- Backup automático

## 📈 Próximas Mejoras

- [ ] Integración con API oficial de WhatsApp Business
- [ ] Envío automático de correos (SMTP)
- [ ] Backend con base de datos centralizada
- [ ] Notificaciones push para móviles
- [ ] Reportes PDF de avisos
- [ ] Integración con SIPEC oficial en tiempo real
- [ ] Firma digital de avisos
- [ ] Multi-idioma (inglés, mapudungun)
- [ ] Exportación de historial a Excel

## 📄 Licencia

Este proyecto es de código abierto y está diseñado para cumplir con la normativa chilena de avisaje de plaguicidas.

---

**Desarrollado para el Sistema de Avisaje Apícola - SAG Chile**  
**Ley Apícola N°21.489 | Resolución SAG N°7068/2024**
