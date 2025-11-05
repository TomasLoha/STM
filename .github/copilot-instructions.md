## Resumen rápido del proyecto

- Stack: NestJS (v11) + TypeScript + Prisma (PostgreSQL).
- Entrypoint: `src/main.ts` — arranca el `AppModule` y escucha en `process.env.PORT || 3000`.
- ORM: Prisma, datasource usa la env var `DATABASE_URL` (ver `prisma/schema.prisma`).

## Arquitectura y límites de servicio

- Aplicación monolítica organizada por módulos de NestJS (cada subcarpeta bajo `src/` suele ser un módulo).
- Módulos importantes a revisar:
  - `src/prisma/` — `PrismaService` extiende `PrismaClient` y hace `$connect()` en `onModuleInit()` y `enableShutdownHooks()`.
  - `src/user/` — módulo de usuarios: `user.module.ts`, `user.service.ts`, `user.controller.ts`.
  - `src/app.module.ts` — importa módulos a alto nivel (nota importante abajo sobre un posible desajuste de nombre).

Por qué: Prisma centraliza acceso a BD vía `PrismaService` para que todos los módulos lo reutilicen.

## Convenciones y patrones específicos detectados

- Soft-delete: los modelos usan `deletedAt: DateTime?` y los servicios filtran `deletedAt: null` (ver `UserService.findAll()` y `prisma/schema.prisma`).
- Validación/DTOs: DTOs existen bajo `src/user/dto/` — los controladores aceptan `@Body()` y los servicios esperan objetos compatibles con `Prisma` (p. ej. `Prisma.UserCreateInput`).
- Errores: servicios lanzan excepciones de Nest (`NotFoundException`) cuando no encuentran recursos (ver `UserService.findOne`).
- Enum y dominios: `EnumTipoConsulta` y modelos relacionados (`Form`, `Meeting`, `Receta`) están en `prisma/schema.prisma` — importantes para cualquier cambio de esquema.

## Comandos y flujos de desarrollador (recuperados de `package.json`)

- Instalar dependencias: `npm install`.
- Generar/actualizar cliente Prisma: `npx prisma generate`.
- Migraciones / sincronizar BD (según flujo elegido):
  - Desarrollo con migraciones: `npx prisma migrate dev` (asume `DATABASE_URL` apuntando a Postgres local/dev).
  - Push directo (no migraciones): `npx prisma db push`.
- Desarrollo: `npm run start:dev` (usa `nest start --watch`).
- Build: `npm run build` -> `dist/` (arranque prod con `npm run start:prod`).
- Tests: `npm test`, E2E: `npm run test:e2e` (usa `test/jest-e2e.json`).
- Lint: `npm run lint`. Formateo: `npm run format`.

Nota: el repo no incluye un `README.md` público; estas instrucciones deberían subsanar esa ausencia para agentes.

## Integraciones y variables de entorno

- Base de datos: Postgres (Prisma datasource `provider = "postgresql"`).
- Variable crítica: `DATABASE_URL` — cualquier acción que afecte la BD (migraciones, pruebas e2e) requiere configurar esta variable.

## Cosas que un agente debe revisar antes de editar código

1. Confirmar la variable `DATABASE_URL` (y si hay .env en la raíz del proyecto o en CI).
2. Ejecutar `npx prisma generate` antes de compilar para evitar errores por cliente Prisma no generado.
3. Revisar `tsconfig.json` (usa `module: nodenext`) — import/exports y resolución de paquetes siguen esa política.

## Ejemplos concretos extraídos del código

- Soft-delete en `UserService.findAll()`:
  - Filtrado activo: `this.prisma.user.findMany({ where: { deletedAt: null } })`.
- Búsqueda con excepción en `UserService.findOne(id)`:
  - Si no existe: `throw new NotFoundException(`User with ID ${id} not found`);`.
- `PrismaService` (conexión y hooks): `src/prisma/prisma.service.ts` — usarlo en todos los servicios para acceder a la BD.

## Advertencia importante encontrada (evitar errores sutiles)

- `src/app.module.ts` importa `UsersModule` desde `./users/users.module` (plural), pero el código existente está bajo `src/user/` (singular) y exporta `UserModule`. Esto puede ser un bug de nomenclatura o un archivo faltante. Antes de renombrar/cambiar:
  - Verificar si existe `src/users/` o si el import en `app.module.ts` debe apuntar a `./user/user.module`.
  - Pequeña corrección segura: arreglar la ruta de import si se confirma que solo hay `src/user/`.

## Qué cambios de bajo riesgo puede aplicar un agente

- Añadir `.env.example` con la variable `DATABASE_URL` como plantilla.
- Agregar o actualizar un `README.md` con comandos de arranque básicos y la advertencia sobre la ruta del módulo `users/user`.
- Ejecutar `npx prisma generate` como parte de la guía de desarrollo en el README.

## Preguntas para el mantenedor (para mejorar instrucciones)

1. ¿Prefieren `src/user` o `src/users` como convención de carpeta? (hay inconsistencia en `app.module.ts`).
2. ¿Hay scripts o CI que manejen la BD de pruebas (por ejemplo, containers, setup scripts) que deba documentar?

---

Si quieres, puedo: (A) aplicar una corrección segura al import en `src/app.module.ts` si confirmas que `src/user` es la carpeta canónica; (B) añadir `.env.example` y un README mínimo con los comandos anteriores. ¿Qué prefieres que haga ahora?
