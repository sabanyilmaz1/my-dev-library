# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Prisma generation)
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run vercel-build` - Build for Vercel deployment (generates Prisma client, pushes DB schema, builds)

### Database Commands

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database without migration files
- `npx prisma migrate dev` - Create and apply migrations (for dev environment)
- `npx prisma migrate deploy` - Apply pending migrations (for production)
- `npx prisma studio` - Open Prisma Studio for database inspection
- `npx prisma db pull` - Pull schema from database to update Prisma schema

## Project Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM (using Neon adapter)
- **Authentication**: better-auth with Prisma adapter
- **Styling**: TailwindCSS with Radix UI components
- **Payments**: Stripe integration via better-auth plugin
- **File Storage**: AWS S3 and Vercel Blob
- **AI Integration**: Google Gemini API for metadata generation
- **Screenshot Generation**: Microlink API for web page thumbnails
- **Validation**: Zod schemas

### Directory Structure

```
src/
├── actions/           # Server actions
│   ├── db/           # Database operations (page.ts, tags.ts)
│   ├── helper.ts     # Helper functions
│   ├── upload-image.ts
│   └── user.ts
├── app/              # Next.js app router
│   ├── (account)/    # Protected routes with layout
│   ├── (auth)/       # Authentication routes
│   ├── (landing-page)/ # Public landing page
│   └── api/          # API routes
├── components/       # Reusable UI components
│   ├── ui/          # Radix UI components
│   └── input-tags.tsx
├── lib/             # Core utilities
│   ├── auth/        # Authentication configuration
│   ├── prisma.ts    # Database client
│   ├── s3-utils.ts  # AWS S3 utilities
│   └── utils.ts     # General utilities
└── utils/           # Utility functions
    └── gemini-utils/ # AI prompt utilities
```

### Key Features

This is a developer library/bookmark management application where users can:

- Save and organize web pages with user-specific tags
- Auto-generate page metadata and descriptions using Google Gemini AI
- Auto-generate screenshots/thumbnails using Microlink API
- Upload and store images in AWS S3
- Filter and search saved pages by tags

### Database Models

- **User**: Authentication with Stripe customer integration
- **Page**: Saved web pages with URL, title, description, tags, and thumbnails
- **Tag**: User-specific tags for organization
- **Session/Account**: Authentication session management

### Authentication Flow

Uses better-auth with email/password authentication, PostgreSQL session storage, and Stripe integration for payments. All protected routes are under `(account)` group.

### State Management

- Server actions for database operations
- React's useActionState for form handling
- Zod validation on both client and server
- Prisma for type-safe database operations

### External APIs

- **Google Gemini API**: Generates page metadata, titles, and descriptions from URLs
- **Microlink API**: Generates website screenshots/thumbnails with configurable delays and timeouts
- **Stripe API**: Handles payment processing and customer management through better-auth plugin

### Development Notes

- Uses TypeScript with strict mode
- Implements responsive design with mobile-first approach
- Follows Next.js App Router conventions
- Uses server components by default with client components marked explicitly
- Implements proper error handling with Zod validation
- Uses Prisma migrations for database schema management
