# Time Tracker

A simple and efficient time tracking application for managing employee clock in/out, breaks, and lunch periods. Built with Next.js and PostgreSQL for reliable time tracking and employee management.

## 🚀 Features

### Authentication & Security
- **Secure Login System** - Email and password-based authentication with JWT tokens
- **Role-Based Access** - Support for USER and ADMIN roles with different permissions
- **Session Management** - Automatic token refresh and secure session handling
- **Password Security** - Bcrypt hashing with strong password requirements

### Time Tracking
- **Manual Clock In/Out** - Simple button-based clock in and out functionality
- **Break Management** - Track two paid breaks per shift with manual start/stop
- **Lunch Break** - Dedicated lunch break tracking with manual controls
- **Real-time Status** - Live display of current employee status (clocked in, on break, on lunch)

### Employee Management
- **Employee CRUD** - Create, read, update, and delete employee records
- **Employee Settings** - Manage employee names, emails, and role assignments
- **Admin Controls** - Administrative interface for managing all employees

### Data & Analytics
- **Shift History** - Complete record of all shifts with detailed timing
- **Break Tracking** - Precise tracking of break start and end times
- **Data Persistence** - Reliable PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Mantine UI](https://mantine.dev/)** - Modern React components library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[clsx + tailwind-merge](https://github.com/lukeed/clsx)** - Conditional classes utility

### Database & Backend
- **[PostgreSQL](https://www.postgresql.org/)** - Reliable relational database
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database client and migrations
- **[Axios](https://axios-http.com/)** - HTTP client for API requests
- **[bcrypt-ts](https://github.com/bleu48/bcrypt-ts)** - Password hashing and verification
- **[jose](https://github.com/panva/jose)** - JWT token generation and verification

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
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Authentication Requirements
- Employee accounts must be created with valid email addresses
- Passwords must meet security requirements:
  - Minimum 8 characters
  - Maximum 30 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%*?&#)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd timeclock
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
   Configure your PostgreSQL connection string and JWT secret:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/timeclock"
   JWT_SECRET="your-super-secret-jwt-key-here"
   ```

4. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser. You'll be redirected to the login page where you can authenticate with your employee credentials.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes for authentication, employees and shifts
│   ├── login/             # Authentication login page
│   └── settings/          # Employee management settings
├── components/            # Reusable React components
│   ├── Clock.tsx         # Main clock in/out component
│   ├── AuthHydrater.tsx  # Authentication state hydration
│   └── Settings/         # Employee management components
├── lib/
│   ├── utils/            # Utility functions and API clients
│   ├── validators/       # Zod validation schemas
│   └── zustand/          # State management stores
prisma/
└── schema/               # Database schema files
```

## 🗄️ Database Schema

### Employee Model
- `id` - Unique identifier
- `name` - Employee name
- `email` - Unique email address for authentication
- `password` - Bcrypt-hashed password
- `role` - User role (USER or ADMIN)
- `isClockedIn` - Current clock status
- `isOnFirstBreak` - First break status
- `isOnLunchBreak` - Lunch break status
- `isOnSecondBreak` - Second break status

### Token Model
- `id` - Unique identifier
- `jti` - JWT ID for refresh token management

### Shift Model
- `id` - Unique identifier
- `employeeId` - Reference to employee
- `date` - Shift date
- `clockInTime` - Clock in timestamp
- `firstBreakStartTime` - First break start
- `firstBreakEndTime` - First break end
- `lunchStartTime` - Lunch start
- `lunchEndTime` - Lunch end
- `secondBreakStartTime` - Second break start
- `secondBreakEndTime` - Second break end
- `clockOutTime` - Clock out timestamp

## 🧪 Testing

Run tests with:
```bash
npm test
# or
npm run test:watch
```

The application includes:
- Jest configuration with Next.js integration
- React Testing Library setup
- Test utilities in `src/lib/jest/`
- Example test in `__tests__/page.test.tsx`

## 🎨 Styling

This application uses a hybrid approach:
- **Mantine UI** for complex components and theming
- **Tailwind CSS** for utility classes and custom styling
- **PostCSS** with Mantine preset for optimal CSS processing

Use the `cn()` utility function for combining Tailwind classes:
```tsx
import { cn } from "@/lib/utils/cn";

<div className={cn("base-classes", conditional && "conditional-classes")}>
```

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For production deployment, ensure your PostgreSQL database is properly configured and the `DATABASE_URL` environment variable is set.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev/getting-started/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Hook Form Documentation](https://react-hook-form.com/docs)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

This time tracker is designed for simple and efficient employee time management. Feel free to contribute improvements or report issues!
