# Gina & Betsabé — repositorio con galería compartida

Esta versión conserva el HTML, CSS, textos y orden visual del archivo original. La única modificación funcional importante es el sistema de recuerdos.

## Qué cambia

Las fotos, videos y audio de la sección existente ahora pueden guardarse en:

- **Firebase Storage**: almacena los archivos.
- **Cloud Firestore**: guarda el registro de cada archivo.
- **onSnapshot**: actualiza la galería en tiempo real en los dispositivos que tengan abierta la página.

Si Firebase no está configurado todavía, la página usa IndexedDB local como respaldo.

## Configuración obligatoria (una sola vez)

1. Crea un proyecto en Firebase.
2. Agrega una aplicación Web.
3. Copia la configuración de Firebase en `firebase-config.js`.
4. En Firebase Authentication activa **Anonymous / Anónimo**.
5. Crea/activa **Cloud Firestore**.
6. Crea/activa **Storage**.
7. Aplica las reglas de `firestore.rules` y `storage.rules`.
8. Sube todos los archivos de este repositorio a la raíz de GitHub Pages.

## Archivos

- `index.html` — página completa con el diseño original y la galería sincronizada.
- `firebase-config.js` — configuración del proyecto Firebase (rellenar).
- `firestore.rules` — reglas para la colección `shared_gallery`.
- `storage.rules` — reglas para la carpeta `gallery`.
- `.gitignore` — archivos que no se suben.

## Nota sobre los recuerdos anteriores

Los archivos que ya estaban guardados en el navegador mediante IndexedDB pertenecen a ese dispositivo/navegador y no pueden convertirse automáticamente en archivos de la nube desde un ZIP. Una vez configurado Firebase, los nuevos archivos que subas se compartirán entre dispositivos.

## Seguridad

La configuración web de Firebase no debe incluir claves privadas ni archivos de cuenta de servicio. Las reglas de Firebase son las que controlan el acceso. Para un proyecto personal, las reglas incluidas requieren autenticación anónima.
