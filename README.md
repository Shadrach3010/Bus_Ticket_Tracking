# Real-Time Digital Bus Ticketing System

Frontend prototype for a secure digital bus ticketing platform. The app is built
with Next.js App Router, TypeScript, Tailwind CSS, and reusable React
components.

## Current Scope

- Public project entry page
- Shared visual foundation and metadata
- Reusable UI primitives for links, badges, branding, and ticket preview
- Mock data and TypeScript domain types for passengers, conductors, routes,
  tickets, reports, and future dashboards

## Getting Started

Run the development server:

```bash
npm.cmd run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

On Windows PowerShell, `npm.cmd` may be required if script execution blocks
`npm.ps1`.

## Project Structure

```text
src/
  app/          App Router pages, layouts, and global styles
  components/   Shared interface components
  lib/          Constants, mock data, and utilities
  types/        Shared TypeScript domain types
```

## Next Milestone

The next planned feature is the authentication flow: login, passenger
registration, and password recovery.
