# AI Agile Coach (Scrum)

An AI-powered Agile Coach web application designed to help students and teams understand and apply Scrum and Agile practices in a practical, interactive way.

This project is developed as part of an Agile Professional course and follows the Scrum framework, including sprint planning, execution, review, and retrospective.

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Forms**: React Hook Form
- **Validation**: Zod
- **Database**: Prisma ORM
- **AI**: Google Generative AI (Gemini)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Gemini API key to .env.local

# Set up database
pnpm prisma migrate dev

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── hooks/           # Custom React hooks
├── pages/           # API routes
└── styles/          # Global styles
prisma/
├── schema.prisma    # Database schema
└── migrations/      # Database migrations
```

## Key Features

- 🤖 AI-powered Scrum guidance
- 📊 Sprint planning and tracking
- 👥 Team collaboration tools
- 💡 Interactive Agile learning
- 📈 Progress monitoring

## Development

```bash
# Run database UI
pnpm prisma studio

# Run dev server with watch mode
pnpm dev

# Build for production
pnpm build
pnpm start
```

## License

This project is developed for educational purposes.
