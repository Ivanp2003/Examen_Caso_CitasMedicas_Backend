# Backend - Sistema de Gestión de Citas Médicas

API REST para gestión de citas médicas con Node.js + Express + MongoDB.

## 🚀 Tecnologías

- Node.js + Express
- MongoDB (Local y Atlas)
- JWT para autenticación
- bcryptjs para encriptación

## 📦 Instalación
```bash
npm install
```

## ⚙️ Configuración

### MongoDB Local (Desarrollo)

Crea `.env.development`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/citas_medicas_db
JWT_SECRET=miClaveSecretaCitasMedicas2024ESFTEC
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:5173
```

### MongoDB Atlas (Producción)

Crea `.env.production`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/citas_medicas_db
JWT_SECRET=clave_produccion_32_caracteres
JWT_EXPIRE=24h
CORS_ORIGIN=https://tu-frontend.onrender.com
```

## 🏃 Ejecutar

### Desarrollo (MongoDB Local)
```bash
npm run dev
```

### Producción (MongoDB Atlas)
```bash
npm start
```

## 📋 Endpoints

### Autenticación
- `POST /api/auth/login` - Login
- `POST /api/auth/registro` - Registro

### Especialidades
- `GET /api/especialidades` - Listar
- `POST /api/especialidades` - Crear
- `PUT /api/especialidades/:id` - Actualizar
- `DELETE /api/especialidades/:id` - Eliminar

### Pacientes
- `GET /api/pacientes` - Listar
- `POST /api/pacientes` - Crear
- `PUT /api/pacientes/:id` - Actualizar
- `DELETE /api/pacientes/:id` - Eliminar

### Citas
- `GET /api/citas` - Listar (con populate)
- `POST /api/citas` - Crear
- `PUT /api/citas/:id` - Actualizar
- `DELETE /api/citas/:id` - Eliminar

## 👤 Usuario de Prueba
```
Email: admin@citas.com
Password: admin123
```

## 🔒 Autenticación

Todas las rutas excepto `/api/auth/*` requieren token JWT:
```
Authorization: Bearer {token}

```