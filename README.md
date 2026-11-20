# Wingora Ventures

The Wingora Ventures website is a React application built with Vite. It includes a marketing homepage, project pages, an admin dashboard, and contact and newsletter forms backed by Supabase.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```sh
npm install
```

Create a `.env.local` file in the project root and set the variables needed by the features you plan to use:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_SUPABASE_URL=
VITE_ADMIN_SUPABASE_ANON_KEY=
VITE_ADMIN_EMAIL=
VITE_ADMIN_PASSWORD=
```

The contact and newsletter forms use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The admin dashboard uses the `VITE_ADMIN_SUPABASE_*` variables. Admin login can be configured with `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`.

Start the local development server:

```sh
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Features and routes

- `/` — marketing homepage
- `/projects` — project listings
- `/projects/:id` — project details
- `/admin` — admin login
- `/admin/dashboard` — admin dashboard

The admin dashboard expects Supabase tables named `categories`, `sub_categories`, `products`, and `product_details`, plus a Storage bucket named `ammaira-products`. The contact and newsletter forms write to `contact_submissions` and `subscribed_users`.

## Email functions

Contact and newsletter confirmations invoke the Supabase Edge Functions `send-contact-email` and `send-subscription-email`. Deploy these functions to your Supabase project and configure the `SENDGRID_API_KEY` secret for them to send email through SendGrid.

## Deployment

Build with `npm run build` and deploy the contents of `dist/` to a static hosting provider. Configure the environment variables in your hosting provider as well. The included `vercel.json` rewrites requests to the app entry point for client-side routing.

## Security note

Vite exposes `VITE_*` variables in the browser bundle. Do not put private keys or secrets in them. The current admin login is client-side and is not suitable for protecting a production dashboard; use server-validated authentication and authorization before exposing admin data or operations.
