# Next.js Full-Stack Template

A comprehensive, production-ready Next.js template with modern tooling and best practices for building full-stack applications.

## 🚀 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Mantine UI](https://mantine.dev/)** - Modern React components library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[clsx + tailwind-merge](https://github.com/lukeed/clsx)** - Conditional classes utility

### Database & Backend
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database (ready to connect)

### State Management & Forms
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Testing
- **[Jest](https://jestjs.io/)** - Testing framework
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Component testing utilities
- **[Testing Library Jest DOM](https://github.com/testing-library/jest-dom)** - Custom Jest matchers

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/pack)** - Fast bundler (enabled in dev mode)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the template:**
   ```bash
   git clone <your-repo-url>
   cd next-bootstrap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Configure your MongoDB connection string and other environment variables.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── lib/
│   ├── jest/              # Testing utilities
│   ├── mongoDB/           # Database connection & models
│   ├── utils/             # Utility functions (cn, etc.)
│   ├── zod/               # Zod schemas
│   └── zustand/           # State management stores
└── components/            # Reusable React components
```

## 🧪 Testing

Run tests with:
```bash
npm test
# or
npm run test:watch
```

The template includes:
- Jest configuration with Next.js integration
- React Testing Library setup
- Test utilities in `src/lib/jest/`
- Example test in `__tests__/page.test.tsx`

## 🎨 Styling

This template uses a hybrid approach:
- **Mantine UI** for complex components and theming
- **Tailwind CSS** for utility classes and custom styling
- **PostCSS** with Mantine preset for optimal CSS processing

Use the `cn()` utility function for combining Tailwind classes:
```tsx
import { cn } from "@/lib/utils/cn";

<div className={cn("base-classes", conditional && "conditional-classes")}>
```

## 🗄️ Database

MongoDB connection is configured in `src/lib/mongoDB/dbConnect.ts`. Create your models in the `mongoDB` directory.

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev/getting-started/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Hook Form Documentation](https://react-hook-form.com/docs)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

This template is designed to be a starting point for your projects. Feel free to customize it according to your needs!
