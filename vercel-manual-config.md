# Configuración Manual para Vercel

## Configuración del Proyecto

### 1. Framework Preset
- **Framework**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

### 2. Variables de Entorno
- `NODE_ENV` = `production`
- `PORT` = (se configura automáticamente)

### 3. Configuración Avanzada
- **Node.js Version**: 18.x
- **Root Directory**: `.` (raíz del proyecto)

## Archivos de Configuración

### vercel.json (ya configurado)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/socket.io/(.*)",
      "dest": "app.js"
    },
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

### package.json (ya configurado)
- Scripts optimizados para Vercel
- Dependencias correctas
- Type: module

## Pasos para Desplegar

1. Ve a https://vercel.com/new
2. Conecta tu repositorio de GitHub
3. Configura según las especificaciones de arriba
4. Despliega

## Notas Importantes
- Socket.IO funcionará correctamente con esta configuración
- El servidor manejará tanto archivos estáticos como WebSockets
- No necesitas configurar variables de entorno adicionales
