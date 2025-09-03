# LearnEase - Smart Learning Management System

[![Watch Demo](https://img.shields.io/badge/Watch_Demo-YouTube-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=y_eISeVB_qo)
## Project Overview

LearnEase is a comprehensive Learning Management System (LMS) built with modern web technologies, offering intelligent course management with AI-powered quiz generation and grading capabilities. The platform provides chapter-wise course playback, progress tracking, and monetization features through Stripe integration.

## Key Features

### Core Learning Features

- **Chapter-wise Course Structure**: Organize courses into digestible chapters with video content
- **Video Streaming**: Integrated Mux video player for seamless video delivery with automatic progress tracking
- **Progress Tracking**: Real-time tracking of student progress through courses and chapters
- **AI-Powered Quizzes**: Automatic quiz generation and intelligent grading system triggered after video completion
- **Interactive Learning**: Students must pass quizzes (80% threshold) to progress to next chapters
- **Course Enrollment**: Streamlined enrollment process with immediate access to purchased content

### Course Management

- **Course Creation**: Teachers can create and manage comprehensive courses with rich content
- **Content Upload**: Support for video uploads (up to 512GB), attachments, and rich text descriptions
- **Course Publishing**: Draft and publish system with approval workflow
- **Category Organization**: Organize courses by categories (Computer Science, Music, Fitness, etc.)
- **Rich Text Editor**: Quill-based WYSIWYG editor for course descriptions and content
- **Chapter Reordering**: Drag-and-drop functionality for organizing chapter sequence
- **File Attachments**: Support for multiple file formats (text, image, video, audio, PDF)

### User Management & Authentication

- **Clerk Authentication**: Secure user authentication with social login options
- **Role-based Access**: Separate interfaces and permissions for students and teachers
- **User Progress**: Individual progress tracking and completion status
- **Profile Management**: User profile and account settings

### Monetization & Analytics

- **Stripe Integration**: Secure payment processing for course enrollment with webhook handling
- **Revenue Analytics**: Comprehensive teacher dashboard with sales and revenue insights
- **Purchase Management**: Track course purchases and enrollment status
- **Leaderboard System**: Gamification with performance tracking and student rankings
- **Analytics Dashboard**: Visual charts and metrics for course performance

### Advanced Features

- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Toast notifications and real-time progress updates
- **File Management**: UploadThing integration with file size optimization
- **Search Functionality**: Advanced course search with category filtering
- **Confetti Celebrations**: Engaging user experience for achievements and completions
- **Content Lock**: Premium content protection for unpurchased courses

## Technology Stack

### Frontend Technologies

- **Next.js 13.4.12**: React framework with App Router and server components
- **TypeScript**: Type-safe development with strict typing
- **Tailwind CSS 3.3.3**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible component primitives for consistent UI
- **React Hook Form 7.46.1**: Form handling with validation and error management
- **Lucide React**: Modern SVG icon library
- **React Quill 2.0.0**: Rich text editor for content creation
- **Hello Pangea DnD**: Drag and drop functionality for chapter reordering

### Backend & Database

- **PostgreSQL**: Primary database with full-text search capabilities
- **Prisma ORM 5.3.0**: Database toolkit with type-safe query builder
- **Next.js API Routes**: Server-side API endpoints with middleware protection
- **Zod 3.22.2**: Schema validation for API routes and forms

### Authentication & Security

- **Clerk 4.23.5**: Complete authentication solution with user management
- **Middleware Protection**: Route-based access control and authentication
- **Role-based Authorization**: Teacher and student permission systems

### Media & File Handling

- **Mux 7.3.1**: Professional video streaming and processing with analytics
- **UploadThing 5.5.3**: File upload management with type safety
- **Next.js Image Optimization**: Optimized image delivery and processing

### Payment & Analytics

- **Stripe 13.6.0**: Payment processing with webhook integration
- **Recharts 2.8.0**: Data visualization for analytics and charts
- **Custom Analytics**: Revenue tracking and performance metrics

### State Management & UI

- **Zustand 4.4.1**: Lightweight state management for global state
- **React Hot Toast 2.4.1**: Notification system with customizable toasts
- **React Confetti 6.1.0**: Celebration animations for achievements
- **Class Variance Authority**: Type-safe utility for component variants

## Database Schema

### Core Models

- **Course**: Course information, pricing, publishing status, and metadata
  - id, userId, title, description, imageUrl, price, isPublished
  - Relations: Category, Chapters, Attachments, Purchases
- **Chapter**: Individual course chapters with video content and positioning
  - id, title, description, videoUrl, position, isPublished, isFree
  - Relations: Course, MuxData, UserProgress
- **Category**: Course categorization system with predefined categories
  - id, name (unique)
- **UserProgress**: Track completion status per user/chapter combination
  - id, userId, chapterId, isCompleted, timestamps
- **Purchase**: Handle course enrollment and payment tracking
  - id, userId, courseId, timestamps

### Advanced Models

- **Quiz**: AI-generated quizzes per chapter with JSON structure
  - id, chapterId, courseId, quiz (JSON data)
- **Leaderboard**: Performance tracking and gamification system
  - id, userId, courseId, chapterId, marks
- **Attachment**: Course-related file attachments with URLs
  - id, name, url, courseId
- **MuxData**: Video streaming metadata and playback information
  - id, assetId, playbackId, chapterId

## Project Setup

### Prerequisites

- **Node.js**: Version 18.x.x or higher
- **PostgreSQL**: Database server (local or cloud)
- **npm/yarn**: Package manager
- **Clerk Account**: For authentication setup
- **Mux Account**: For video streaming
- **UploadThing Account**: For file uploads
- **Stripe Account**: For payment processing

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/learnease

# File Upload (UploadThing)
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Video Streaming (Mux)
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TEACHER_ID=user_clerk_id_for_teacher_access

# Payment (Stripe)
STRIPE_API_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Installation Steps

1. **Clone and Install Dependencies**

```bash
git clone <repository-url>
cd LearnEase
npm install
```

2. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Push database schema to PostgreSQL
npx prisma db push

# Seed initial categories
node scripts/seed.ts
```

3. **Configure External Services**

   - Set up Clerk project and configure authentication
   - Create Mux account and obtain API credentials
   - Set up UploadThing for file management
   - Configure Stripe for payment processing

4. **Start Development Server**

```bash
npm run dev
```

5. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign up for a new account or sign in
   - Explore the dashboard and course features

## Application Architecture

### Folder Structure

```
LearnEase/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages (sign-in/sign-up)
│   ├── (dashboard)/       # Student dashboard and teacher management
│   ├── (course)/          # Course viewing and chapter interfaces
│   ├── api/               # API routes and webhooks
│   ├── globals.css        # Global styles and Tailwind imports
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── modals/           # Modal components
│   └── providers/        # Context providers
├── actions/               # Server actions and data fetching
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── prisma/                # Database schema and migrations
└── scripts/               # Database seeding and utilities
```

### Route Organization

#### Public Routes

- `/sign-in` - User authentication
- `/sign-up` - User registration

#### Student Routes

- `/` - Dashboard with course progress and enrollment status
- `/search` - Course discovery with category filtering
- `/courses/[courseId]` - Course overview and enrollment
- `/courses/[courseId]/chapters/[chapterId]` - Chapter content and video player

#### Teacher Routes

- `/teacher/courses` - Course management dashboard
- `/teacher/courses/create` - Create new course
- `/teacher/courses/[courseId]` - Edit course details and chapters
- `/teacher/courses/[courseId]/chapters/[chapterId]` - Edit chapter content
- `/teacher/analytics` - Revenue and sales analytics

#### API Routes

- `/api/courses` - Course CRUD operations
- `/api/courses/[courseId]/chapters` - Chapter management
- `/api/courses/[courseId]/checkout` - Payment processing
- `/api/courses/[courseId]/publish` - Course publishing
- `/api/leaderboard` - Quiz scores and rankings
- `/api/uploadthing` - File upload handling
- `/api/webhook` - Stripe webhook processing

## Key Components

### Video Player Component

- **Mux Integration**: Professional video streaming with adaptive bitrate
- **Progress Tracking**: Automatic completion tracking on video end
- **Quiz Triggering**: Seamless transition to quiz after video completion
- **Content Protection**: Lock mechanism for unpurchased content
- **Loading States**: Skeleton loading and error handling

### Quiz System

- **AI Generation**: Automatic quiz creation based on chapter content
- **Interactive Interface**: Multiple-choice questions with real-time feedback
- **Scoring System**: 80% passing threshold with retry functionality
- **Progress Integration**: Automatic advancement on quiz completion
- **Leaderboard Updates**: Performance tracking and ranking system

### Course Management

- **Rich Content Editor**: Quill-based WYSIWYG editor for descriptions
- **File Upload System**: Multi-format support with size optimization
- **Chapter Organization**: Drag-and-drop reordering with position tracking
- **Publishing Workflow**: Draft-to-published state management
- **Content Validation**: Form validation and error handling

### Payment Integration

- **Stripe Checkout**: Secure payment processing with session management
- **Webhook Handling**: Real-time purchase confirmation and enrollment
- **Purchase Tracking**: Complete audit trail of transactions
- **Error Handling**: Comprehensive error management and user feedback

### Analytics Dashboard

- **Revenue Visualization**: Interactive charts with Recharts
- **Course Performance**: Enrollment and completion metrics
- **Teacher Insights**: Detailed analytics for course creators
- **Real-time Updates**: Live data with automatic refresh

## Development Features

### Type Safety

- **Full TypeScript**: Complete type coverage across the application
- **Prisma Types**: Auto-generated database types
- **Zod Validation**: Runtime type checking for API routes
- **Component Props**: Strongly typed component interfaces

### Code Quality

- **Tailwind CSS**: Consistent styling with design system
- **Component Patterns**: Reusable and composable components
- **Error Boundaries**: Graceful error handling and recovery

### Performance Optimization

- **Next.js Features**: Image optimization, SSR, and static generation
- **Database Optimization**: Efficient queries with Prisma
- **Code Splitting**: Dynamic imports for optimal bundle size
- **Caching Strategies**: Client-side and server-side caching
