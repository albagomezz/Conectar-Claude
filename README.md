# Calculadora - Localhost

Esta es una calculadora simple en HTML/CSS/JS que puedes ver en tu navegador apuntando a `http://localhost:8000` (u otro puerto).

Archivos incluidos:
- `index.html` — interfaz.
- `styles.css` — estilos.
- `script.js` — lógica de la calculadora.

Cómo ejecutar localmente:
1. Clona o copia los archivos en una carpeta en tu máquina.
2. Abre una terminal en esa carpeta.
3. Sirve los archivos con un servidor estático. Opciones:
   - Con Python 3:
     ```
     python3 -m http.server 8000
     ```
     Luego abre `http://localhost:8000` en tu navegador.
   - O puedes simplemente abrir `index.html` con el navegador (aunque algunas funciones requieren servidor para rutas relativas).
4. Usa el mouse o el teclado. Soporta:
   - Números y punto decimal.
   - Operadores + − × ÷ (teclado: + - * /).
   - Enter para calcular, Backspace para borrar, Escape para limpiar.
   - % para porcentaje (calcula el valor /100).
   
Notas de seguridad:
- La evaluación de la expresión usa una evaluación muy simple para facilitar el ejemplo. No uses este método directamente con entradas no confiables en producción sin un parser seguro.

Si quieres que:
- lo empaquete como una app con Electron,
- añada historial de operaciones,
- o soporte operaciones científicas (sin, cos, potencias...),

dime y lo preparo.
