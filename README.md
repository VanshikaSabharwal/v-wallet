# V-Wallet Turborepo Setup Guide

This is a Turborepo setup for the V-Wallet project including `user-app`, `user-bot`, and shared packages.

It includes Prisma database, Next.js frontends, and scripts for building, formatting, and testing database optimizations.

---

## **1. Install dependencies**

From the root of the monorepo:

```bash
npm install
```

1.1 Install Python dependencies (for chatbot)

```bash
cd apps/user-bot
pip install -r requirements.txt
```

1.2 Install Node.js dependencies for user app

```bash
cd ../user-app
npm install
```

## **2. Setup environment variables**

1. Copy .env.example to .env in each relevant package:

```bash
cp .env.example .env
cp .env.example.local .env.local
```

2. apps/chatbot .env

```bash
cd apps/chatbot
cp .env.example .env
```

3. apps/user-app .env

```bash
cd ../user-app
cp .env.example .env
cp .env.example.local .env.local
```

## **3. Prisma Database Migration**

Navigate to the database package and run migrations:

```bash
cd packages/db
npx prisma migrate dev --name init
```

Replace init with a descriptive migration name for updates.

## **4. Start Development Servers**

User App

```bash
cd apps/user-app
npm run dev
```

- Starts the user-app in development mode.
- Hot-reloading enabled.

Chatbot App

```bash
cd apps/chatbot
npm run dev
```

- Start chatbot server

## **5. Code Formatting**

```bash
npm run format
```

- Runs Prettier on the whole monorepo.
- Ensures consistent styling.

## **6. Test Database Indexes**

```bash
npm run test-indexes
```

- Runs a script to check performance differences before and after adding indexes.
- Verifies that adding indexes reduces query time for large datasets.

## **7. Notes**

- Ensure DATABASE_URL in .env points to your PostgreSQL instance.

- Indexes significantly improve query times on large tables (user, transaction, p2pTransfer).

- Redis caching can be selectively added to read-heavy endpoints.

- Prisma migrations automatically apply schema changes and indexes.

- Test indexes using npm run test-indexes to measure performance.

### Project Structure

```bash
apps/
  user-app/       # Next.js user frontend & backend
  user-bot/       # Chatbot backend
packages/
  db/             # Prisma schemas & database scripts
  ui/             # Shared React components
  eslint-config/  # ESLint configuration
  typescript-config/ # Shared tsconfig
```
