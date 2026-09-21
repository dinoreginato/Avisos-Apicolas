# 🔗 Guía Rápida: Integración Directa con CPA del SAG

## 🎯 Solución Sin Instalaciones

Ahora puedes obtener todos los apiarios del SAG **directamente desde el navegador**, sin instalar Python ni ejecutar scripts.

## 📋 Cómo Funciona

### Flujo Simplificado (4 pasos)

1. **Abrir CPA** → Un clic y se abre el CPA del SAG en nueva pestaña
2. **Copiar Datos** → Copias los datos desde el CPA (JSON, CSV o tabla)
3. **Pegar en App** → Pegas los datos en la aplicación
4. **Guardar** → Los datos se guardan automáticamente en tu navegador

## 🚀 Paso a Paso

### Paso 1: Abrir el CPA del SAG

1. Ve a la pestaña **"Actualizar Datos"** en la aplicación
2. Busca la sección **"🔗 Acceso Directo al CPA del SAG"**
3. Haz clic en **"🌐 Abrir CPA del SAG"**
4. Se abrirá https://cpa.sag.gob.cl en una nueva pestaña
5. Inicia sesión con tu **Clave Única**

### Paso 2: Copiar Datos del CPA

**Opción A: Exportar (Recomendada)**
1. En el CPA, busca la opción **"Exportar"** o **"Descargar datos"**
2. Selecciona formato **JSON** (preferido) o **CSV**
3. Copia todo el contenido del archivo descargado

**Opción B: Copiar Tabla**
1. Si no hay opción de exportar, busca la tabla de apicultores
2. Selecciona toda la tabla (Ctrl+A dentro de la tabla)
3. Copia (Ctrl+C)
4. La tabla se copiará con formato de tabs

**Opción C: Copiar JSON Manual**
1. Abre la consola del navegador (F12)
2. Busca la pestaña "Network" o "Red"
3. Recarga la página del CPA
4. Busca las peticiones que traen datos de apicultores
5. Copia el JSON de la respuesta

### Paso 3: Pegar Datos en la Aplicación

1. Vuelve a la pestaña de la aplicación
2. Haz clic en **"Ya copié los datos →"**
3. Pega los datos en el área de texto (Ctrl+V)
4. Haz clic en **"Procesar Datos →"**

**Formatos Aceptados:**

✅ **JSON** (recomendado):
```json
[
  {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.cl",
    "telefono": "+56912345678",
    "region": "O'Higgins",
    "comuna": "Requínoa",
    "apiarios": [
      {
        "nombre": "Apiario Los Álamos",
        "latitud": -34.28,
        "longitud": -70.86,
        "cantidadColmenas": 150
      }
    ]
  }
]
```

✅ **CSV**:
```csv
nombre,email,telefono,region,comuna,latitud,longitud,colmenas
Juan Pérez,juan@ejemplo.cl,+56912345678,O'Higgins,Requínoa,-34.28,-70.86,150
```

✅ **Tabla copiada** (con tabs):
```
nombre	email	telefono	region	comuna
Juan Pérez	juan@ejemplo.cl	+56912345678	O'Higgins	Requínoa
```

### Paso 4: Guardar en Base de Datos

1. Revisa el resumen de datos procesados
2. Verifica que los datos sean correctos
3. Haz clic en **"💾 Guardar en Base de Datos"**
4. ¡Listo! Los datos se guardan en tu navegador

## 📊 Resultados Esperados

Después de completar el proceso:

| Métrica | Antes | Después |
|---------|-------|---------|
| **Apicultores** | ~250 | **10,504** |
| **Apiarios** | ~275 | **20,150** |
| **Cobertura** | 1.2% | **100%** |
| **Datos** | Ejemplo | **Oficiales SAG** |

## 🔒 Seguridad

### Tus Datos
- ✅ **100% local**: Todo se procesa en tu navegador
- ✅ **Sin servidor**: No se envía nada a servidores externos
- ✅ **Sin instalación**: No necesitas instalar nada
- ✅ **Privado**: Los datos se guardan solo en tu navegador (localStorage)

### Tu Clave Única
- ✅ **Nunca ingresas tu Clave Única en la app**
- ✅ **Solo la usas en el sitio oficial del SAG**
- ✅ **La app nunca ve ni almacena tu Clave Única**

## 💡 Consejos

### Para Obtener los Datos del CPA

**Método 1: Exportar Directamente**
- Busca botones como "Exportar", "Descargar", "Generar reporte"
- Formatos preferidos: JSON > CSV > Excel

**Método 2: Inspeccionar Red**
1. Abre DevTools (F12)
2. Ve a pestaña "Network"
3. Filtra por "XHR" o "Fetch"
4. Recarga la página del CPA
5. Busca peticiones que contengan "apicultores" o "apiarios"
6. Haz clic en la petición y copia el JSON de "Response"

**Método 3: Copiar Tabla**
1. Selecciona la tabla completa en el CPA
2. Copia (Ctrl+C)
3. Pega en la app (la app detectará el formato de tabla)

### Si el CPA No Tiene Opción de Exportar

Puedes usar la consola del navegador para extraer datos:

```javascript
// Ejemplo genérico (puede variar según la estructura del CPA)
const data = document.querySelectorAll('table tr');
const result = [];
data.forEach(row => {
  const cols = row.querySelectorAll('td');
  if (cols.length > 0) {
    result.push({
      nombre: cols[0]?.textContent?.trim(),
      email: cols[1]?.textContent?.trim(),
      telefono: cols[2]?.textContent?.trim(),
      region: cols[3]?.textContent?.trim(),
      comuna: cols[4]?.textContent?.trim()
    });
  }
});
console.log(JSON.stringify(result, null, 2));
// Copia el resultado de la consola
```

## 🔄 Actualizar Datos Periódicamente

Los datos del SAG cambian constantemente. Para mantener tu base de datos actualizada:

1. **Cada 3-6 meses**, repite el proceso
2. Los nuevos datos se **fusionan** con los existentes
3. No se duplican apicultores (el sistema los identifica por nombre + región)

## 🛠️ Solución de Problemas

### "No se encontraron datos válidos"
**Causa:** El formato de los datos no es reconocido
**Solución:**
- Verifica que los datos estén completos
- Intenta con formato JSON (más confiable)
- Usa el botón "📋 Copiar Ejemplo" para ver el formato esperado

### "Error al procesar los datos"
**Causa:** Los datos tienen formato incorrecto
**Solución:**
- Verifica que el JSON sea válido (usa https://jsonlint.com)
- Asegúrate de que CSV tenga encabezados en la primera fila
- Para tablas, asegúrate de copiar toda la tabla incluyendo encabezados

### Los datos se procesan pero faltan campos
**Causa:** Los nombres de columnas son diferentes
**Solución:**
- El sistema acepta múltiples nombres (ej: "teléfono", "telefono", "celular", "fono")
- Si falta algún campo, el sistema lo deja vacío
- Puedes editar los datos manualmente después de importar

### El CPA no me deja copiar datos
**Causa:** El CPA tiene restricciones de copia
**Solución:**
- Usa el método de "Inspeccionar Red" (ver arriba)
- Usa la consola del navegador para extraer datos
- Contacta al SAG para solicitar exportación oficial

### Los datos no se guardan
**Causa:** Problemas con localStorage del navegador
**Solución:**
- Verifica que no estés en modo incógnito
- Limpia la caché del navegador
- Intenta con otro navegador
- Verifica que tengas espacio en localStorage (mínimo 5MB)

## 📞 Soporte

### Problemas con el CPA del SAG
- **Teléfono:** +56 2 2345 1100
- **Email:** oficina.informaciones@sag.gob.cl
- **Sitio:** https://www.sag.gob.cl

### Problemas con la Clave Única
- **Sitio:** https://www.claveunica.cl
- **Teléfono:** 600 332 0000

### Problemas con la Aplicación
- Revisa esta guía
- Intenta con el ejemplo copiado
- Limpia datos del navegador y reinicia

## ⚖️ Aspectos Legales

### Uso Permitido
- ✅ Acceso personal con tu Clave Única
- ✅ Extracción de datos para uso propio
- ✅ Almacenamiento local en tu navegador
- ✅ Uso en esta aplicación de avisaje

### Uso NO Permitido
- ❌ Compartir tu Clave Única
- ❌ Distribuir los datos extraídos
- ❌ Uso comercial sin autorización
- ❌ Automatización masiva sin consentimiento

## 🎓 Recursos Adicionales

### Enlaces Útiles
- [CPA del SAG](https://cpa.sag.gob.cl)
- [SIPEC Apícola](https://sipecweb.sag.gob.cl)
- [SAG Principal](https://www.sag.gob.cl)
- [Clave Única](https://www.claveunica.cl)

### Validadores de JSON
- [JSONLint](https://jsonlint.com)
- [JSON Formatter](https://jsonformatter.org)

## 📝 Notas Finales

- **No necesitas instalar nada**: Todo funciona en el navegador
- **Es seguro**: Tus credenciales nunca tocan la aplicación
- **Es rápido**: El proceso toma 5-10 minutos
- **Es actualizable**: Puedes repetir el proceso cuando quieras
- **Es local**: Los datos se guardan solo en tu navegador

## 🎉 ¡Listo!

Ahora tienes una forma **simple, rápida y segura** de obtener todos los apiarios del SAG sin instalar nada. Solo necesitas:

1. Tu Clave Única
2. Un navegador web
3. 5-10 minutos de tu tiempo

¡Y tendrás acceso a los 20,150 apiarios registrados en Chile!

---

**Última actualización:** Enero 2026  
**Versión:** 2.0 (Integración Directa)  
**Requisitos:** Solo un navegador web moderno
