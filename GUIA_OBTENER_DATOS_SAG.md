# 📋 Guía para Obtener Datos Reales de Apiarios del SAG

## 🎯 Situación Actual

### Datos Oficiales SAG (SIPEC)
- **Total Nacional**: 10,504 apicultores | 20,150 apiarios | 1,404,214 colmenas
- **O'Higgins**: 1,166 apicultores | 2,684 apiarios | 260,733 colmenas
- **Maule**: 1,720 apicultores | 3,699 apiarios | 292,853 colmenas
- **Araucanía**: 1,814 apicultores | 2,628 apiarios | 124,945 colmenas

### Datos en Nuestra Base de Datos
- **Total**: ~250 apicultores de ejemplo
- **O'Higgins**: 67 apicultores
- **Cobertura**: ~2.4% del total real

## ❌ Por qué faltan los datos

**El SIPEC (Sistema de Información Pecuaria Apícola) es un sistema privado del SAG.**

Los datos completos con coordenadas GPS y contactos **NO están disponibles públicamente** en formato descargable. Solo tenemos acceso a:
- Estadísticas agregadas (Boletín Apícola)
- Sistema CPA (muestra apicultores en zona, pero no permite descarga masiva)
- Información general del sector

## ✅ Cómo Obtener los Datos Reales

### Opción 1: Solicitud de Información Pública (Recomendada)

**Ley de Transparencia (Ley 20.205)**

**Pasos:**
1. Enviar correo a: `oficina.informaciones@sag.gob.cl`
2. Asunto: "Solicitud de información pública - Base de datos SIPEC Apícola"
3. Solicitar específicamente:
   - Base de datos completa de apiarios registrados en SIPEC
   - Incluir: coordenadas GPS, datos de contacto (email/teléfono), comuna, región
   - Justificación: "Para implementación de sistema de avisaje según Ley Apícola N°21.489"

**Modelo de correo:**

```
Estimados SAG,

Junto con saludar, solicito acceso a la base de datos completa de apiarios 
registrados en el SIPEC Apícola, incluyendo:

- Coordenadas GPS de cada apiario
- Datos de contacto del apicultor (email y teléfono)
- Comuna y región de ubicación
- Cantidad de colmenas por apiario

Esta información es requerida para implementar un sistema de avisaje de 
aplicación de plaguicidas según lo establecido en la Ley Apícola N°21.489 
y la Resolución Exenta N°7068/2024.

Agradeciendo de antemano su atención.

Saludos cordiales,
[Tu nombre]
[Tu organización]
[Tu RUT]
```

### Opción 2: Contacto Directo con SAG Regional

**SAG O'Higgins:**
- Email: `contacto.ohiggins@sag.gob.cl`
- Teléfono: `+56 9 79490421`
- Dirección: Bulnes 140, Rancagua

**SAG Maule:**
- Email: `contacto.maule@sag.gob.cl`
- Teléfono: `+56 71 2226053`

**SAG Araucanía:**
- Email: `contacto.araucania@sag.gob.cl`
- Teléfono: `+56 45 2210383`

### Opción 3: A través de CPA (Consulta Para Avisaje)

**URL:** https://cpa.sag.gob.cl

**Limitaciones:**
- Muestra apicultores en zona de influencia
- No permite descarga masiva
- Requiere registro previo

**Uso:**
1. Registrarse en el sistema
2. Ingresar coordenadas de un campo
3. Ver apicultores en radio de 3 km
4. Copiar datos manualmente (no recomendado para 2,684 apiarios)

## 📥 Formato de Importación

Una vez que obtengas los datos del SAG, puedes importarlos usando nuestra herramienta.

### Formato CSV Requerido

**Opción A: Formato Simple (un apiario por fila)**

```csv
nombre,email,telefono,region,comuna,latitud,longitud,colmenas
Juan Pérez,juan@email.com,+56912345678,O'Higgins,Requínoa,-34.28,-70.86,150
María González,maria@email.com,+56987654321,O'Higgins,Rancagua,-34.17,-70.74,200
```

**Opción B: Formato con Múltiples Apiarios (JSON)**

```csv
nombre,email,telefono,region,comuna,apiarios
Juan Pérez,juan@email.com,+56912345678,O'Higgins,Requínoa,"[{""id"":""api1"",""nombre"":""Apiario Norte"",""latitud"":-34.28,""longitud"":-70.86,""comuna"":""Requínoa"",""region"":""O'Higgins"",""cantidadColmenas"":150}]"
```

### Pasos para Importar

1. **Descargar plantilla** desde la pestaña "Actualizar"
2. **Completar datos** en Excel o editor de texto
3. **Guardar como CSV** (delimitado por comas)
4. **Importar archivo** en la aplicación
5. **Verificar importación** en pestaña "Mis Campos"

## 🔄 Actualización Periódica

**Frecuencia recomendada:** Cada 3-6 meses

**Razones:**
- Nuevos apicultores se registran constantemente
- Apiarios cambian de ubicación
- Datos de contacto pueden actualizarse
- Cambios en clasificación de toxicidad de productos

## 📊 Estadísticas por Región (Datos Oficiales SAG 2023)

| Región | Apicultores | Apiarios | Colmenas | Promedio Colmenas/Apicultor |
|--------|-------------|----------|----------|------------------------------|
| Araucanía | 1,814 | 2,628 | 124,945 | 68.9 |
| Maule | 1,720 | 3,699 | 292,853 | 170.3 |
| Biobío | 1,246 | 2,129 | 98,392 | 78.9 |
| O'Higgins | 1,166 | 2,684 | 260,733 | 223.6 |
| Metropolitana | 850 | 1,548 | 152,507 | 179.4 |
| Ñuble | 814 | 1,477 | 97,346 | 119.6 |
| Los Lagos | 721 | 1,851 | 135,610 | 188.1 |
| Valparaíso | 700 | 1,588 | 126,967 | 181.4 |
| Los Ríos | 572 | 1,085 | 62,847 | 109.9 |
| Coquimbo | 590 | 977 | 46,265 | 78.4 |
| Atacama | 101 | 203 | 2,868 | 28.4 |
| Aysén | 123 | 180 | 2,233 | 18.2 |
| Antofagasta | 36 | 41 | 245 | 6.8 |
| Tarapacá | 30 | 37 | 283 | 9.4 |
| Arica y Parinacota | 18 | 20 | 111 | 6.2 |
| Magallanes | 3 | 3 | 9 | 3.0 |

## 💡 Recomendaciones

1. **Priorizar regiones con más apiarios**: O'Higgins, Maule, Araucanía
2. **Solicitar datos en formato Excel/CSV** para facilitar importación
3. **Verificar coordenadas GPS** de todos los apiarios importados
4. **Mantener backup** de los datos importados
5. **Actualizar periódicamente** según cambios del SAG

## 🔗 Enlaces Útiles

- **SAG Principal**: https://www.sag.gob.cl
- **SIPEC Apícola**: https://sipecweb.sag.gob.cl
- **CPA (Avisaje)**: https://cpa.sag.gob.cl
- **Boletín Apícola**: https://www.sag.gob.cl/sites/default/files/Boletín%20Apícola%20Nº8.pdf
- **Directorio Oficinas**: https://www.sag.gob.cl/directorio-de-oficinas

## 📞 Contactos SAG

**Central:**
- Teléfono: `+56 2 2345 1100`
- Email: `oficina.informaciones@sag.gob.cl`

**O'Higgins:**
- Teléfono: `+56 9 79490421`
- Email: `contacto.ohiggins@sag.gob.cl`

**Maule:**
- Teléfono: `+56 71 2226053`
- Email: `contacto.maule@sag.gob.cl`

**Araucanía:**
- Teléfono: `+56 45 2210383`
- Email: `contacto.araucania@sag.gob.cl`

---

**Última actualización**: Enero 2026  
**Fuente**: Boletín Apícola N°8 - SAG (mayo 2023)
