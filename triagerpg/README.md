# TriageRPG

A gamified SOC (Security Operations Center) Analyst Dashboard built with Next.js, Prisma, and the Google Gemini API. It turns your daily triage backlog into an RPG adventure, awarding XP and tracking streaks as you resolve cases.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18.17 or higher)
- **npm** (v9 or higher)
- **Git**

You will also need accounts/keys for the following services:
- A **PostgreSQL Database** (e.g., [Neon](https://neon.tech), Supabase, or local)
- A **GitHub OAuth App** (for user authentication)
- A **Google Gemini API Key** (for AI Triage summaries)
- A **Stripe Account** (optional, for the Energy Points store)

## Setup Instructions

### 1. Clone the Repository
Clone this project to your main PC and navigate into the project directory:
```bash
git clone <your-repo-url>
cd triagerpg
```

### 2. Install Dependencies
Install all required Node.js packages:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template environment file to create your local `.env` file:
```bash
cp env.template .env
```
Open the `.env` file and fill in all the required keys:
- `DATABASE_URL`: Your PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Generate a random string (e.g., run `openssl rand -base64 32` in your terminal).
- `GITHUB_ID` & `GITHUB_SECRET`: From your GitHub Developer Settings.
- `GEMINI_API_KEY`: From Google AI Studio.

### 4. Set Up the Database
Push the Prisma schema to your database to create the necessary tables:
```bash
npx prisma db push
```
Then, generate the Prisma Client:
```bash
npx prisma generate
```

### 5. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing the Application

### Logging In
Click "Sign in with GitHub" on the homepage. The first time you log in, a new User record will be created in your database.

### Creating a Test Case
Since cases are meant to be ingested via webhooks from tools like Splunk or Jira, you can use the provided seed script to generate a dummy case for testing the UI:

1. Open a new terminal window.
2. Ensure you are in the `triagerpg` directory.
3. Run the seed script:
```bash
npx tsx scripts/seed-case.ts
```
*(Note: You must have logged in via the web UI at least once before running this script so it can assign the case to your user).*

### Testing AI Triage
1. Go to your dashboard at `http://localhost:3000`.
2. Click **"View Details"** on the newly created test case.
3. The AI Triage Summary will automatically begin generating using the Gemini API.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js (Auth.js)
- **AI Integration:** Google Gemini (`@google/genai`)
