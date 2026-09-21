# 🔗 Guía de Integración con CPA del SAG

## 📋 ¿Qué es esta integración?

Esta sección te permite obtener **TODOS los apiarios registrados en Chile** directamente desde el sistema oficial del SAG (CPA - Consulta Para Avisaje) usando tu Clave Única.

## 🎯 ¿Por qué necesito esto?

Actualmente la aplicación tiene ~250 apiarios de ejemplo, pero el SAG registra **20,150 apiarios** en todo Chile. Con esta integración podrás:

- ✅ Obtener el 100% de los apiarios reales
- ✅ Tener datos actualizados directamente del SAG
- ✅ Acceder a coordenadas GPS exactas
- ✅ Obtener contactos verificados de apicultores
- ✅ Cumplir completamente con la Ley Apícola N°21.489

## 📊 Estadísticas Actuales vs. Reales

| Región | Apiarios en App | Apiarios Reales (SAG) | Cobertura |
|--------|----------------|----------------------|-----------|
| O'Higgins | 67 | 2,684 | 2.5% |
| Maule | 41 | 3,699 | 1.1% |
| Araucanía | 40 | 2,628 | 1.5% |
| Metropolitana | 10 | 1,548 | 0.6% |
| **Total** | **~250** | **20,150** | **1.2%** |

## 🚀 Cómo Usar la Integración

### Paso 1: Preparar tu Entorno

**Requisitos:**
- Python 3.7 o superior instalado
- Clave Única del SAG vigente
- Conexión a internet

**Instalar Python (si no lo tienes):**
- Windows: https://www.python.org/downloads/
- Mac: `brew install python3`
- Linux: `sudo apt-get install python3`

### Paso 2: Descargar el Script

1. Ve a la pestaña **"Actualizar Datos"** en la aplicación
2. Busca la sección **"🔗 Integración con CPA del SAG"**
3. Haz clic en **"📥 Descargar Script Python"**
4. Se descargará el archivo `extraer_cpa_sag.py`

### Paso 3: Instalar Dependencias

Abre una terminal (CMD en Windows, Terminal en Mac/Linux) y ejecuta:

```bash
pip install requests beautifulsoup4
```

**Nota:** Si usas Mac o Linux, puede que necesites:
```bash
pip3 install requests beautifulsoup4
```

### Paso 4: Ejecutar el Script

En la misma terminal, navega a donde descargaste el script y ejecuta:

```bash
python extraer_cpa_sag.py
```

**El script te pedirá:**
1. Tu RUT (sin puntos ni guión, ej: 12345678)
2. Tu Clave Única (se oculta mientras escribes)

**Ejemplo:**
```
============================================================
EXTRACTOR DE DATOS CPA - SAG
============================================================

⚠️  IMPORTANTE:
Este script requiere tu Clave Única del SAG.
Tus credenciales NO se almacenan ni se envían a terceros.

Ingresa tu RUT (sin puntos ni guión): 12345678
Ingresa tu Clave Única: ********

🔐 Iniciando sesión en CPA...
✅ Token CSRF obtenido
✅ Login exitoso

🔍 Extrayendo datos de apicultores...
  📍 Procesando Arica y Parinacota...
    ✅ 18 apicultores encontrados
  📍 Procesando Tarapacá...
    ✅ 30 apicultores encontrados
  📍 Procesando Antofagasta...
    ✅ 36 apicultores encontrados
  ...
  📍 Procesando O'Higgins...
    ✅ 1,166 apicultores encontrados
  ...

💾 Guardando 10,504 apicultores...
✅ Datos guardados en: apicultores_cpa.json

============================================================
RESUMEN
============================================================
Total de apicultores extraídos: 10,504
Archivo generado: apicultores_cpa.json
```

**⏱️ Tiempo estimado:** 5-10 minutos

### Paso 5: Importar Datos en la Aplicación

1. Vuelve a la aplicación web
2. En la sección **"🔗 Integración con CPA del SAG"**, haz clic en **"Continuar"** hasta llegar al **Paso 4**
3. Haz clic en **"📄 Seleccionar archivo"**
4. Selecciona el archivo `apicultores_cpa.json` que generó el script
5. Haz clic en **"💾 Guardar en Base de Datos"**

### Paso 6: Verificar la Importación

Después de importar:
- Ve a la pestaña **"Mis Campos"**
- Registra un campo con coordenadas GPS
- El sistema mostrará automáticamente todos los apiarios en radio de 3km
- Deberías ver muchos más apicultores que antes

## 🔒 Seguridad y Privacidad

### Tus Credenciales
- ✅ Tu Clave Única se usa **solo localmente** en tu computador
- ✅ **NO se envía** a ningún servidor externo
- ✅ **NO se almacena** en la aplicación
- ✅ El script se ejecuta **100% en tu computador**

### Los Datos Extraídos
- ✅ Se guardan **solo en tu navegador** (localStorage)
- ✅ Puedes eliminarlos cuando quieras
- ✅ No se comparten con terceros
- ✅ Son para tu uso personal

### Legalidad
- ✅ Acceso autorizado con tu Clave Única personal
- ✅ Cumple con la Ley 19.880 de Procedimientos Administrativos
- ✅ Uso personal según términos del SAG
- ⚠️ **NO compartas** tu Clave Única con nadie

## 🛠️ Solución de Problemas

### Error: "No se pudo obtener el token CSRF"
**Causa:** El CPA cambió su estructura o hay problemas de conexión
**Solución:** 
1. Verifica tu conexión a internet
2. Intenta nuevamente en unos minutos
3. Si persiste, el SAG puede haber actualizado su sistema

### Error: "Credenciales inválidas"
**Causa:** RUT o Clave Única incorrectos
**Solución:**
1. Verifica que tu RUT no tenga puntos ni guión
2. Asegúrate de que tu Clave Única esté vigente
3. Si la olvidaste, recupérala en https://www.claveunica.cl

### Error: "No se pudieron obtener datos de [región]"
**Causa:** Problemas temporales con el CPA o esa región no tiene datos
**Solución:**
1. El script continuará con las demás regiones
2. Al final tendrás la mayoría de los datos
3. Puedes ejecutar el script nuevamente para reintentar

### El script se ejecuta pero no genera archivo
**Causa:** Permisos de escritura en la carpeta
**Solución:**
1. Ejecuta el script desde una carpeta donde tengas permisos de escritura
2. En Windows: ejecuta CMD como administrador
3. En Mac/Linux: usa `sudo python extraer_cpa_sag.py`

### "pip: command not found"
**Causa:** Python no está instalado o no está en el PATH
**Solución:**
1. Instala Python desde https://www.python.org/downloads/
2. Durante la instalación, marca la opción "Add Python to PATH"
3. Reinicia la terminal e intenta nuevamente

## 📈 Resultados Esperados

Después de una ejecución exitosa, tendrás:

### Datos Completos
- **10,504 apicultores** registrados en SIPEC
- **20,150 apiarios** con coordenadas GPS exactas
- **1,404,214 colmenas** distribuidas en todo Chile
- **Contactos verificados** (email y teléfono)

### Cobertura por Región
| Región | Apicultores Esperados |
|--------|----------------------|
| Araucanía | 1,814 |
| Maule | 1,720 |
| Biobío | 1,246 |
| O'Higgins | 1,166 |
| Metropolitana | 850 |
| Ñuble | 814 |
| Los Lagos | 721 |
| Valparaíso | 700 |
| Los Ríos | 572 |
| Coquimbo | 590 |
| Atacama | 101 |
| Aysén | 123 |
| Antofagasta | 36 |
| Tarapacá | 30 |
| Arica y Parinacota | 18 |
| Magallanes | 3 |

## 🔄 Actualización Periódica

Los datos del SAG cambian constantemente (nuevos registros, cambios de ubicación, etc.). 

**Recomendación:** Ejecuta el script cada 3-6 meses para mantener los datos actualizados.

**Para actualizar:**
1. Ejecuta el script nuevamente
2. Importa el nuevo archivo JSON
3. Los datos se fusionarán con los existentes

## 📞 Soporte

### Problemas con el Script
- Revisa la sección "Solución de Problemas" arriba
- Verifica que Python esté correctamente instalado
- Asegúrate de tener las dependencias instaladas

### Problemas con la Clave Única
- Sitio oficial: https://www.claveunica.cl
- Teléfono: 600 332 0000
- Correo: soporte@claveunica.cl

### Problemas con el CPA del SAG
- Teléfono SAG: +56 2 2345 1100
- Correo: oficina.informaciones@sag.gob.cl
- Sitio: https://www.sag.gob.cl

## ⚖️ Aspectos Legales

### Uso Permitido
- ✅ Acceso personal con tu Clave Única
- ✅ Extracción de datos para uso propio
- ✅ Almacenamiento local de datos
- ✅ Uso en esta aplicación de avisaje

### Uso NO Permitido
- ❌ Compartir tu Clave Única
- ❌ Distribuir los datos extraídos
- ❌ Uso comercial sin autorización
- ❌ Automatización sin consentimiento del SAG

### Base Legal
- Ley 19.880 - Bases de los Procedimientos Administrativos
- Ley 21.489 - Ley Apícola
- Resolución Exenta N°7068/2024 - Clasificación Ecotoxicológica

## 🎓 Recursos Adicionales

### Documentación Oficial
- [SAG - Registro de Apicultores](https://www.sag.gob.cl/content/registro-de-apicultores-y-declaracion-de-apiarios)
- [CPA - Sistema de Avisaje](https://cpa.sag.gob.cl)
- [SIPEC Apícola](https://sipecweb.sag.gob.cl)
- [Boletín Apícola N°8](https://www.sag.gob.cl/sites/default/files/Bolet%C3%ADn%20Ap%C3%ADcola%20N%C2%BA8.pdf)

### Tutoriales
- [Tutorial CPA en 3 pasos (YouTube)](https://www.youtube.com/watch?v=Y8A-elPaFsY)
- [Cómo obtener Clave Única](https://www.claveunica.cl/como-obtenerla)

## 📝 Notas Finales

- El script hace **pausas de 1 segundo** entre regiones para no saturar el servidor del SAG
- Si el script falla en una región, **continúa con las demás**
- Puedes ejecutar el script **múltiples veces** sin problemas
- Los datos se **fusionan automáticamente** al importar
- Si tienes problemas, **reinicia el proceso** desde el Paso 1

---

**Última actualización:** Enero 2026  
**Versión del script:** 1.0  
**Compatibilidad:** Python 3.7+

¿Necesitas ayuda? Revisa la sección de "Solución de Problemas" o contacta al soporte del SAG.
