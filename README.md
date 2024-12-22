# Mental Health Assessment Platform

A comprehensive web application for mental health self-assessment using standardized GAD-7 and PHQ-9 questionnaires, enhanced with AI-powered analysis and personalized recommendations.

## Features

- Professional mental health assessments (GAD-7 and PHQ-9)
- Secure user authentication
- AI-enhanced analysis and personalized recommendations
- Progress tracking and visualization
- Data export capabilities
- Lifestyle factor analysis

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- Yarn package manager

To install Yarn, run:
```bash
npm install -g yarn
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
OPENAI_API_KEY = <OPENAI_API_KEY>
DATABASE_URL = <DATABASE_URL>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = <NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY = <CLERK_SECRET_KEY>
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Bandrailian/CPSC571-Project.git
cd CPSC571-Project
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Tools

This project uses several development tools:
- TypeScript for type safety
- ESLint for code linting
- SASS for styling
- Next.js 15.1 for the framework
- Clerk for authentication
- OpenAI API for AI-powered analysis

## Available Scripts

- `yarn dev` - Runs the development server with Turbopack
- `yarn build` - Builds the application for production
- `yarn start` - Starts the production server
- `yarn lint` - Runs ESLint for code linting

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [MongoDB](https://www.mongodb.com/docs/)

## License

[MIT](LICENSE)