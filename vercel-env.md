# Variables de Entorno para Vercel

Configura estas variables en el dashboard de Vercel:

## Variables Requeridas:
- `NODE_ENV` = `production`
- `PORT` = (Vercel lo maneja automáticamente)

## Variables Opcionales:
- `VERCEL_URL` = (se configura automáticamente)

## Notas:
- Vercel maneja automáticamente el puerto y la URL
- No necesitas configurar variables adicionales para Socket.IO
- El CORS se configurará automáticamente con la URL de Vercel
