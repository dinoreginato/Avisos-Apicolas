# 🐝 Sistema de Avisaje Apícola - SAG Chile

## 📋 Descripción

Aplicación web completa para el sistema de avisaje de aplicación de plaguicidas tóxicos para abejas, conectada con la base de datos oficial del SAG (Servicio Agrícola y Ganadero) de Chile.

### ✨ Características Principales

✅ **Base de datos completa del SAG** (~750+ productos fitosanitarios)  
✅ **Sistema de registro de campos con coordenadas GPS**  
✅ **Base de datos de apicultores SIPEC por región**  
✅ **Cálculo automático de zona de influencia (3 km)**  
✅ **Envío de avisos por WhatsApp y correo electrónico**  
✅ **Sistema de usuarios multi-región**  
✅ **Mapa interactivo con Leaflet**  
✅ **Plantillas personalizables para mensajes**  
✅ **Historial de avisos por usuario**  

---

## 🌾 Sistema de Campos con Coordenadas

### Registro de Campos por Usuario

Cada usuario puede registrar sus propios campos con coordenadas geográficas específicas:

**Datos del campo:**
- 📍 Nombre del campo
- 🌐 Coordenadas (latitud/longitud) - obtenibles con GPS automático
- 🏘️ Región y comuna
- 📐 Hectáreas
- 🌱 Tipo de cultivo

**Características:**
- ✅ Geolocalización automática con botón 📍
- ✅ Validación de coordenadas dentro de Chile (-55 a -17 lat, -76 a -66 lng)
- ✅ Múltiples campos por usuario
- ✅ Mapa interactivo con todos los campos
- ✅ Cálculo automático de apicultores en zona de influencia

### Base de Datos de Apicultores SIPEC

El sistema incluye una base de datos de apicultores registrados en el **SIPEC Apícola** del SAG:

**Regiones con apicultores registrados:**
- Metropolitana (Buin, Paine, Talagante)
- O'Higgins (Rancagua, San Fernando, Santa Cruz)
- Maule (Talca, Curicó, Linares)
- Ñuble (Chillán, San Carlos)
- Biobío (Concepción, Los Ángeles)
- La Araucanía (Temuco, Villarrica, Angol)
- Los Ríos (Valdivia, Osorno)
- Los Lagos (Puerto Montt, Puerto Varas)
- Valparaíso (Quillota, San Felipe, La Ligua)
- Coquimbo (La Serena, Ovalle)
- Atacama (Copiapó)
- Tarapacá (Iquique)

**Estadísticas nacionales:**
- ~20,150 apiarios registrados en Chile
- Promedio de 73 colmenas por apiario

---

## 📤 Flujo de Uso Completo

### Paso 1: Registro de Usuario
```
1. Registrarse con datos personales
2. Incluir email y teléfono (para enviar avisos)
3. Seleccionar región y comuna
4. Elegir rol: Aplicador, Apicultor o Asesor
```

### Paso 2: Registro de Campos
```
1. Ir a pestaña "Mis Campos"
2. Click en "➕ Registrar Nuevo Campo"
3. Ingresar nombre del campo
4. Obtener coordenadas con botón 📍 o ingresar manualmente
5. Seleccionar región y comuna
6. Ingresar hectáreas y tipo de cultivo
7. Guardar campo
```

### Paso 3: Selección de Producto
```
1. Ir a pestaña "Productos SAG"
2. Buscar producto por nombre o N° SAG
3. Filtrar por toxicidad si requiere avisaje
4. Click en "Usar" para seleccionar producto
```

### Paso 4: Configuración del Aviso
```
1. Ir a pestaña "Avisaje"
2. Seleccionar uno de sus campos registrados
3. Configurar fecha (mínimo 48h anticipación)
4. Seleccionar horario de baja actividad de abejas
5. Sistema muestra automáticamente apicultores SIPEC en zona de 3 km
```

### Paso 5: Envío de Avisos
```
1. Seleccionar medio de envío (WhatsApp, Email o ambos)
2. Vista previa del mensaje
3. Click en "Enviar Avisos"
4. Se abren ventanas de WhatsApp/Email para cada apicultor
5. Usuario confirma envío manualmente
6. Aviso se registra en historial
```

---

## 🗺️ Cálculo de Zona de Influencia

### Fórmula de Haversine

El sistema utiliza la fórmula de Haversine para calcular distancias entre el campo y los apiarios:

```
Zona de influencia: 3 km (según normativa SAG)

d = 2r × arcsin(√(sin²((lat₂-lat₁)/2) + cos(lat₁)×cos(lat₂)×sin²((lng₂-lng₁)/2)))
```

### Proceso Automático

1. Usuario selecciona campo con coordenadas
2. Sistema obtiene todos los apiarios SIPEC de la región
3. Calcula distancia a cada apiario
4. Filtra apiarios dentro de 3 km
5. Muestra apicultores a notificar con datos de contacto

---

## 📱 Envío de Avisos

### 💬 WhatsApp
- **Tecnología**: Enlaces `wa.me` con mensajes pre-llenados
- **Funcionamiento**: 
  1. Sistema genera mensaje con todos los datos
  2. Se abre WhatsApp Web/App con mensaje listo
  3. Usuario confirma y envía manualmente
  4. Se registra en historial

### 📧 Correo Electrónico
- **Tecnología**: Enlaces `mailto:` con HTML formateado
- **Funcionamiento**:
  1. Sistema genera email HTML profesional
  2. Se abre cliente de correo predeterminado
  3. Usuario revisa y envía
  4. Se registra en historial

### 📝 Ejemplo de Mensaje

```
🐝 AVISO DE APLICACIÓN DE PLAGUICIDA

Estimado/a apicultor/a Juan Pérez,

Le informo que se realizará una aplicación de plaguicida:

📍 Campo: Fundo El Roble
📍 Ubicación: Rancagua, O'Higgins
📍 Coordenadas: -34.1532, -70.7647
📍 Superficie: 120 ha

🧪 Producto: Confidor 200 SL
⚠️ Toxicidad: Muy tóxico
📅 Fecha: 15/05/2026
⏰ Hora: 05:00-07:00

Tome las precauciones necesarias.

Saludos,
María González
Fundo Los Aromos Ltda.
📞 +56 9 1234 5678
```

---

## 🧪 Base de Datos de Productos

### Fuente de Datos
- **Power BI del SAG** - Clasificación Ecotoxicológica Abejas
- **Actualización**: 30/04/2026
- **Total productos**: ~750+ productos fitosanitarios

### Clasificación de Toxicidad (Res. 7068/2024)

| Categoría | DL50 Contacto | Avisaje | Vigencia |
|-----------|---------------|---------|----------|
| **Muy Tóxico** | < 2 μg/abeja | ✅ Obligatorio | Desde 26/01/2026 |
| **Tóxico** | 2 - 10.99 μg/abeja | ✅ Obligatorio | Desde 26/01/2026 |
| **Moderadamente Tóxico** | 11 - 25 μg/abeja | ✅ Obligatorio | Desde 26/04/2026 |
| **Ligeramente Tóxico** | 26 - 100 μg/abeja | ❌ No requiere | - |
| **Virtualmente No Tóxico** | > 100 μg/abeja | ❌ No requiere | - |

---

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- npm o yarn
- Navegador web moderno con soporte para geolocalización

### Instalación

```bash
# Clonar repositorio
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
│   ├── AuthScreen.tsx       # Login/Registro
│   ├── UserProfile.tsx      # Perfil de usuario
│   ├── CampoManager.tsx     # Gestión de campos
│   └── MapView.tsx          # Mapa interactivo
├── data/
│   ├── sagProducts.ts       # Base de datos SAG
│   ├── apicultoresSIPEC.ts  # Apicultores por región
│   └── fields.ts            # Utilidades de campos
├── services/
│   ├── userService.ts       # Gestión de usuarios
│   └── campoService.ts      # Gestión de campos
├── types/
│   ├── user.ts              # Tipos de usuario
│   └── fields.ts            # Tipos de campos
└── App.tsx                  # Componente principal
```

---

## 🔒 Seguridad y Privacidad

### Almacenamiento de Datos
- **Usuarios**: LocalStorage del navegador
- **Campos**: LocalStorage del navegador
- **Avisos**: LocalStorage del navegador
- **Base de datos SAG**: Archivos estáticos

### Recomendaciones para Producción
- Backend con base de datos (PostgreSQL, MongoDB)
- Autenticación con JWT o OAuth2
- API de WhatsApp Business para envío automático
- Servicio SMTP para correos
- HTTPS obligatorio
- Backup automático

---

## 📞 Enlaces Oficiales SAG

- **Sistema CPA**: https://cpa.sag.gob.cl
- **SIPEC Apícola**: https://sipecweb.sag.gob.cl
- **Power BI SAG**: https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1...
- **Planilla Plaguicidas**: http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados

---

## 📜 Marco Legal

- **Ley Apícola N°21.489** - Promulgada el 4 de octubre de 2022
- **Resolución Exenta N°7068/2024** - Clasificación ecotoxicológica
- **Obligación de avisaje**: 48 horas de anticipación
- **Zona de influencia**: 3 km desde el campo de aplicación
- **Medios verificables**: Email, SMS, escrito presencial

---

## 🛠️ Próximas Mejoras

- [ ] Integración con API oficial de WhatsApp Business
- [ ] Envío automático de correos (SMTP)
- [ ] Backend con base de datos centralizada
- [ ] Notificaciones push para móviles
- [ ] Reportes PDF de avisos
- [ ] Integración con SIPEC oficial en tiempo real
- [ ] Geolocalización automática de campos con mapa
- [ ] Firma digital de avisos
- [ ] Multi-idioma (inglés, mapudungun)
- [ ] Exportación de historial a Excel

---

**Desarrollado para el Sistema de Avisaje Apícola - SAG Chile**  
**Ley Apícola N°21.489 | Resolución SAG N°7068/2024**
