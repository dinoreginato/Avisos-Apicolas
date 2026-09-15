# Sistema de Avisaje Apícola - SAG Chile

## 🐝 Descripción

Aplicación web completa para el sistema de avisaje de aplicación de plaguicidas tóxicos para abejas, conectada con la base de datos oficial del SAG (Servicio Agrícola y Ganadero) de Chile.

### Características Principales

✅ **Base de datos completa del SAG** (~750+ productos fitosanitarios)
✅ **Clasificación ecotoxicológica** según Resolución 7068/2024
✅ **Sistema de usuarios multi-región** con autenticación
✅ **Envío de avisos por WhatsApp y correo electrónico**
✅ **Mapa interactivo** con cálculo de zonas de influencia
✅ **Plantillas personalizables** para mensajes
✅ **Historial de avisos** por usuario
✅ **Estadísticas en tiempo real**

---

## 🔐 Sistema de Usuarios

### Registro de Usuarios

Cada usuario debe registrarse con:
- **Nombre completo**
- **Email** (para envío de avisos)
- **Teléfono** (para WhatsApp)
- **Rol**: Aplicador, Apicultor o Asesor Técnico
- **Región y Comuna** (ubicación geográfica)
- **Empresa** (opcional)

### Roles de Usuario

1. **🌾 Aplicador de Plaguicidas**
   - Puede generar y enviar avisos
   - Accede a la base de datos de productos
   - Gestiona sus campos de aplicación

2. **🐝 Apicultor**
   - Recibe avisos de aplicación
   - Consulta apiarios registrados
   - Verifica zonas de influencia

3. **📋 Asesor Técnico**
   - Acceso completo al sistema
   - Puede asesorar en el uso de productos
   - Genera reportes y estadísticas

---

## 📤 Envío de Avisos

### Medios de Envío Disponibles

#### 💬 WhatsApp
- **Tecnología**: Enlaces `wa.me` con mensajes pre-llenados
- **Funcionamiento**: 
  1. El sistema genera el mensaje con todos los datos
  2. Se abre WhatsApp Web/App con el mensaje listo
  3. El usuario confirma y envía manualmente
  4. Se registra en el historial

**Ventajas**:
- ✅ Inmediato y verificable
- ✅ No requiere integración con API de WhatsApp Business
- ✅ Funciona en todos los dispositivos
- ✅ Mensaje editable antes de enviar

#### 📧 Correo Electrónico
- **Tecnología**: Enlaces `mailto:` con HTML formateado
- **Funcionamiento**:
  1. El sistema genera email HTML profesional
  2. Se abre el cliente de correo predeterminado
  3. El usuario revisa y envía
  4. Se registra en el historial

**Ventajas**:
- ✅ Formato HTML profesional
- ✅ Compatible con cualquier cliente de correo
- ✅ Mensaje editable antes de enviar
- ✅ Registro automático

### Plantillas de Mensajes

El sistema incluye plantillas predefinidas que incluyen:

**Variables disponibles**:
- `{usuario_nombre}` - Nombre del aplicador
- `{usuario_empresa}` - Empresa del aplicador
- `{usuario_telefono}` - Teléfono de contacto
- `{usuario_email}` - Email de contacto
- `{campo_nombre}` - Nombre del campo
- `{campo_comuna}` - Comuna del campo
- `{campo_region}` - Región del campo
- `{campo_lat}` - Latitud del campo
- `{campo_lng}` - Longitud del campo
- `{campo_hectareas}` - Superficie en hectáreas
- `{producto_nombre}` - Nombre comercial del producto
- `{producto_toxicidad}` - Clasificación de toxicidad
- `{fecha_aplicacion}` - Fecha de aplicación
- `{hora_aplicacion}` - Horario de aplicación
- `{apicultor_nombre}` - Nombre del apicultor

**Ejemplo de mensaje WhatsApp**:
```
🐝 AVISO DE APLICACIÓN DE PLAGUICIDA

Estimado/a apicultor/a Juan Pérez,

Le informo que se realizará una aplicación de plaguicida en las siguientes coordenadas:

📍 Campo: Fundo El Roble
📍 Ubicación: Rancagua, O'Higgins
📍 Coordenadas: -34.1532, -70.7647
📍 Superficie: 120 ha

🧪 Producto: Confidor 200 SL
⚠️ Toxicidad: Muy tóxico
📅 Fecha de aplicación: 15/05/2026
⏰ Hora: 05:00-07:00

Por favor, tome las precauciones necesarias para proteger sus colmenas.

Saludos cordiales,
María González
Fundo Los Aromos Ltda.
📞 +56 9 1234 5678
📧 maria@losaromos.cl
```

---

## 🗺️ Sistema de Zonas de Influencia

### Cálculo de Distancia

El sistema utiliza la **fórmula de Haversine** para calcular la distancia entre el campo y los apiarios:

```
Zona de influencia: 3 km (según normativa SAG)
```

### Apiarios en Zona

Cuando se selecciona un campo, el sistema:
1. Calcula la distancia a todos los apiarios registrados
2. Identifica los apiarios dentro de la zona de 3 km
3. Muestra los apicultores que deben ser notificados
4. Proporciona sus datos de contacto (email y teléfono)

---

## 🧪 Base de Datos de Productos

### Fuente de Datos

- **Power BI del SAG** - Clasificación Ecotoxicológica Abejas
- **Actualización**: 30/04/2026
- **Total productos**: ~750+ productos fitosanitarios

### Clasificación de Toxicidad

Según **Resolución 7068/2024**:

| Categoría | DL50 Contacto | Avisaje | Vigencia |
|-----------|---------------|---------|----------|
| **Muy Tóxico** | < 2 μg/abeja | ✅ Obligatorio | Desde 26/01/2026 |
| **Tóxico** | 2 - 10.99 μg/abeja | ✅ Obligatorio | Desde 26/01/2026 |
| **Moderadamente Tóxico** | 11 - 25 μg/abeja | ✅ Obligatorio | Desde 26/04/2026 |
| **Ligeramente Tóxico** | 26 - 100 μg/abeja | ❌ No requiere | - |
| **Virtualmente No Tóxico** | > 100 μg/abeja | ❌ No requiere | - |

### Ejemplos de Productos

**Muy Tóxicos** (requieren avisaje):
- Imidacloprid (Confidor, Gaucho)
- Tiametoxam (Actara, Cruiser)
- Clotianidina (Poncho)
- Lambda-cialotrina (Karate)
- Deltametrina (Decis)
- Abamectina (Vertimec)
- Fipronil (Regent)

**Virtualmente No Tóxicos** (no requieren avisaje):
- Clorantraniliprole (Coragen)
- Spirodiclofen (Envidor)
- Spirotetramat (Movento)
- Bacillus thuringiensis (Dipel)

---

## 📊 Estadísticas por Usuario

Cada usuario puede ver:
- **Total de avisos enviados**
- **Avisos enviados este mes**
- **Apicultores notificados** (total único)
- **Fecha del último aviso**
- **Historial completo** de avisos

---

## 🔧 Instalación y Uso

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
│   ├── AvisoEnvio.tsx       # Componente de envío de avisos
│   └── MapView.tsx          # Mapa interactivo
├── data/
│   ├── sagProducts.ts       # Base de datos principal SAG
│   ├── sagProductsExtra.ts  # Productos complementarios
│   ├── sagProductsMas.ts    # Productos adicionales
│   ├── fields.ts            # Campos y apiarios
│   └── products.ts          # Clasificaciones
├── services/
│   └── userService.ts       # Gestión de usuarios y avisos
├── types/
│   └── user.ts              # Tipos TypeScript
└── App.tsx                  # Componente principal
```

---

## 📱 Flujo de Uso

### Para Aplicadores

1. **Registrarse** en el sistema con datos de contacto
2. **Seleccionar producto** desde la base de datos SAG
3. **Verificar toxicidad** (si requiere avisaje)
4. **Seleccionar campo** de aplicación
5. **Configurar fecha y hora** (mínimo 48h anticipación)
6. **Revisar apicultores** en zona de influencia
7. **Seleccionar medio de envío** (WhatsApp, Email o ambos)
8. **Vista previa** del mensaje
9. **Enviar avisos** a todos los apicultores
10. **Confirmar envío** y registrar en historial

### Para Apicultores

1. **Registrarse** con datos de contacto actualizados
2. **Consultar apiarios** registrados
3. **Recibir avisos** por WhatsApp y/o Email
4. **Tomar precauciones** según fecha y hora de aplicación

---

## 🔒 Seguridad y Privacidad

### Almacenamiento de Datos

- **Usuarios**: LocalStorage del navegador
- **Avisos**: LocalStorage del navegador
- **Base de datos SAG**: Archivos estáticos (no se modifican)

### Recomendaciones

Para producción, se recomienda:
- Implementar backend con base de datos (PostgreSQL, MongoDB)
- Autenticación con JWT o OAuth2
- API de WhatsApp Business para envío automático
- Servicio SMTP para envío de correos
- HTTPS obligatorio
- Backup automático de datos

---

## 📞 Soporte y Contacto

### Enlaces Oficiales SAG

- **Sistema CPA (Consulta Para Avisaje)**: https://cpa.sag.gob.cl
- **SIPEC Apícola**: https://sipecweb.sag.gob.cl
- **Power BI SAG**: https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1...
- **Planilla Plaguicidas**: http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados

### Marco Legal

- **Ley Apícola N°21.489** - Promulgada el 4 de octubre de 2022
- **Resolución Exenta N°7068/2024** - Clasificación ecotoxicológica
- **Obligación de avisaje**: 48 horas de anticipación
- **Zona de influencia**: 3 km desde el campo de aplicación

---

## 🚀 Próximas Mejoras

- [ ] Integración con API oficial de WhatsApp Business
- [ ] Envío automático de correos (SMTP)
- [ ] Backend con base de datos centralizada
- [ ] Notificaciones push para móviles
- [ ] Reportes PDF de avisos
- [ ] Integración con SIPEC oficial
- [ ] Geolocalización automática de campos
- [ ] Firma digital de avisos
- [ ] Multi-idioma (inglés, mapudungun)

---

## 📄 Licencia

Este proyecto es de código abierto y está diseñado para cumplir con la normativa chilena de avisaje de plaguicidas.

---

**Desarrollado para el Sistema de Avisaje Apícola - SAG Chile**  
**Ley Apícola N°21.489 | Resolución SAG N°7068/2024**
