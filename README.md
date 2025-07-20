# My Dev Library

> A modern web page bookmark management system for developers

**My Dev Library** is an intelligent bookmark management application that helps developers save, organize, and retrieve web pages effortlessly. With AI-powered metadata generation and smart tagging, never lose track of important resources again.

## Features

- **Smart Bookmarking** - Save web pages with automatic title and description generation
- **AI-Powered Tagging** - Intelligent tag suggestions using Google Gemini AI
- **Auto Screenshots** - Automatic thumbnail generation for saved pages
- **Advanced Search** - Filter and search by tags, titles, and descriptions  
- **Modern UI** - Beautiful interface with dark/light theme support
- **Secure Auth** - Email/password authentication with Stripe integration
- **Cloud Storage** - Reliable storage with Cloudflare R2
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 + TailwindCSS
- **Components**: Radix UI primitives
- **Styling**: TailwindCSS with custom design system
- **Theme**: next-themes for dark/light mode

### Backend
- **Database**: PostgreSQL with Neon adapter
- **ORM**: Prisma with type-safe queries
- **Authentication**: better-auth with Prisma adapter
- **Payments**: Stripe integration
- **Validation**: Zod schemas

### External APIs
- **AI Content**: Google Gemini API for metadata generation
- **Screenshots**: Microlink API for page thumbnails
- **Storage**: Cloudflare R2 for file uploads and delivery

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google Gemini API key
- Cloudflare R2 credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-dev-library.git
   cd my-dev-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure the following variables:
   ```env
   DATABASE_URL="postgresql://..."
   BETTER_AUTH_SECRET="your-secret-key"
   GEMINI_API_KEY="your-gemini-api-key"
   CLOUDFLARE_R2_ACCESS_KEY_ID="your-r2-access-key"
   CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-r2-secret"
   CLOUDFLARE_R2_BUCKET_NAME="your-bucket-name"
   STRIPE_PUBLISHABLE_KEY="your-stripe-key"
   STRIPE_SECRET_KEY="your-stripe-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── actions/           # Server actions for database operations
│   ├── db/           # Database-specific actions (pages, tags, users)
│   └── helper.ts     # Utility functions
├── app/              # Next.js app router
│   ├── (account)/    # Protected dashboard routes
│   ├── (auth)/       # Authentication pages
│   ├── (landing-page)/ # Public landing page
│   └── api/          # API routes for AI and external services
├── components/       # Reusable UI components
│   └── ui/          # Radix UI component library
├── lib/             # Core utilities and configurations
│   ├── auth/        # Authentication setup
│   ├── prisma.ts    # Database client
│   └── utils.ts     # General utilities
└── utils/           # Feature-specific utilities
    └── gemini-utils/ # AI prompt engineering
```

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma studio` - Open Prisma Studio

### Deployment
- `npm run vercel-build` - Build for Vercel (includes DB setup)

## Key Features Deep Dive

### AI-Powered Content Generation
The application uses Google Gemini AI to automatically:
- Extract meaningful titles from web pages
- Generate concise descriptions
- Suggest relevant tags based on content
- Maintain consistency with existing user tags

### Smart Screenshot System
Integrated with Microlink API to:
- Capture high-quality page screenshots
- Generate thumbnails with configurable delays
- Handle dynamic content and JavaScript-heavy sites
- Provide fallback images for failed captures

### Advanced Tag Management
- User-specific tag system with auto-suggestions
- Tag-based filtering and search
- Drag-and-drop tag organization
- Bulk tag operations

## Contributing

We welcome contributions! Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with love for the developer community**