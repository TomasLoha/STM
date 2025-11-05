# Backend STA (Sistema de Turnos de Atención)

Backend NestJS + TypeScript + Prisma (PostgreSQL) para el sistema de turnos de atención.

## Requisitos

- Node.js (versión en package.json)
- PostgreSQL
- npm

## Configuración inicial

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```bash
# Copiar plantilla
cp .env.example .env
# Editar .env y configurar DATABASE_URL con tu conexión PostgreSQL
```

3. Generar cliente Prisma:

```bash
npx prisma generate
```

4. Migrar base de datos:

```bash
# Desarrollo con migraciones
npx prisma migrate dev
# O push directo (no migraciones)
npx prisma db push
```

## Desarrollo

```bash
# Desarrollo
npm run start:dev

# Build
npm run build

# Producción
npm run start:prod
```

## Tests

```bash
# Unit tests
npm test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Endpoints

### Users (`/users`)

- `GET /users` - Listar usuarios
- `GET /users/:id` - Ver usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario (soft-delete)

### Forms (`/forms`)

- `GET /forms` - Listar formularios
- `GET /forms/:id` - Ver formulario
- `POST /forms` - Crear formulario
- `PUT /forms/:id` - Actualizar formulario
- `DELETE /forms/:id` - Eliminar formulario

### Meetings (`/meetings`)

- `GET /meetings` - Listar reuniones
- `GET /meetings/:id` - Ver reunión
- `POST /meetings` - Crear reunión
- `PUT /meetings/:id` - Actualizar reunión
- `DELETE /meetings/:id` - Eliminar reunión

### Recetas (`/recetas`)

- `GET /recetas` - Listar recetas
- `GET /recetas/:id` - Ver receta
- `POST /recetas` - Crear receta
- `PUT /recetas/:id` - Actualizar receta
- `DELETE /recetas/:id` - Eliminar receta

### Detalle Recetas (`/detalle-recetas`)

- `GET /detalle-recetas` - Listar detalles
- `GET /detalle-recetas/:id` - Ver detalle
- `POST /detalle-recetas` - Crear detalle
- `PUT /detalle-recetas/:id` - Actualizar detalle
- `DELETE /detalle-recetas/:id` - Eliminar detalle

## Notas importantes

1. Ejecutar siempre `npx prisma generate` después de cambios en `schema.prisma`
2. La variable `DATABASE_URL` es requerida para cualquier operación con la BD
3. Hay un posible desajuste en `app.module.ts` - verifica si prefieres `src/user/` o `src/users/`
