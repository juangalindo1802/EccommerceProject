# VANTA.TECH

Ecommerce full stack premium (portafolio profesional) construido con:

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (carrito persistente)
- Supabase Auth + Supabase Postgres
- Prisma ORM
- Stripe Checkout
- Cloudinary Upload

## Demo funcional incluida

- Home premium, catálogo, detalle producto
- Carrito lateral + `/cart`
- Checkout Stripe + estados `success/cancel`
- Historial de órdenes de usuario (`/account/orders`)
- Wishlist (`/account/wishlist`)
- Panel admin completo:
  - `/admin`
  - `/admin/products`
  - `/admin/products/new`
  - `/admin/products/[id]/edit`
  - `/admin/orders`

## Arquitectura

```
src/
  app/
  components/
  hooks/
  lib/
  services/
  store/
  types/
prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

DATABASE_URL=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud-name>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<unsigned-upload-preset>
```

## Instalación

```bash
npm install
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm run dev
```

## Promover admin

1. Regístrate en `/register`
2. Promueve tu usuario:

```bash
npm run admin:promote -- tu-correo@dominio.com
```

## Scripts

- `npm run dev` desarrollo
- `npm run build` build producción
- `npm run prisma:generate` generar cliente Prisma
- `npm run prisma:deploy` aplicar migraciones en DB
- `npm run prisma:seed` cargar catálogo inicial
- `npm run admin:promote -- correo` convertir usuario en admin

## Flujo de compra

1. Usuario agrega productos al carrito (persistencia local).
2. En `/cart`, ajusta cantidades.
3. Checkout crea orden `pending` + sesión Stripe.
4. Webhook Stripe marca orden `paid` y descuenta stock.
5. Si cancela, orden pasa a `cancelled`.
6. Usuario consulta historial en `/account/orders`.

## Seguridad

- Rutas `/admin/*` protegidas por rol `isAdmin`.
- Órdenes y wishlist visibles solo para el usuario dueño.
- Validación de stock en creación de orden y confirmación de pago.

## Deploy recomendado

- Frontend/API: Vercel
- DB/Auth: Supabase
- Media: Cloudinary
- Payments: Stripe

Configura en producción las mismas variables `.env.local` como Environment Variables del proveedor.

