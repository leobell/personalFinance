# Flowly

Flowly is a personal finance tracker that helps you connect your expenses, organize them into categories, and see exactly where your money goes each month through clean, readable charts.

**Live app:** [flowlyfinance.app](https://flowlyfinance.app)

## What it does

Flowly answers three simple questions for anyone trying to keep their finances in check:

- **What did I spend money on?** Log income and expenses in seconds, each tied to a category.
- **Where does it break down?** A horizontal bar chart shows exactly how much went to each category in a given month.
- **How is it trending?** A monthly chart compares income against expenses across the whole year.

New accounts start with a set of sensible default categories (Groceries, Transport, Bills, Entertainment, Shopping, Health, Salary) so there's something useful to see immediately — all fully editable or deletable.

## Features

- **Authentication** — email/password or Google Sign-In, with password reset and email verification flows (via Resend)
- **Dashboard** — monthly income/expense/net stat tiles, a spending-by-category chart, and a yearly income vs. expense trend chart
- **Categories** — full CRUD, grouped by Income/Expense, color-coded from a colorblind-safe validated palette
- **Transactions** — full CRUD with category filtering by type, amount validation, and date tracking
- **Settings** — update profile and currency (EUR/USD/GBP), change password, delete account
- **Multi-currency** — every amount is formatted according to the account's chosen currency
- **Dark mode** — a manual toggle, not just OS-based, persisted per browser
- **Responsive** — a proper mobile layout, including a bottom tab bar on small screens
- **Rate limiting** on sensitive endpoints, hashed passwords (bcrypt), and no cookies — auth is stateless via JWT

## Tech stack

**Frontend**
- React (Vite) + React Router
- Tailwind CSS v4
- Recharts for data visualization
- Framer Motion for animation
- react-hot-toast, react-helmet-async

**Backend**
- Node.js + Express 5
- PostgreSQL + Prisma ORM
- Passport.js (Google OAuth 2.0)
- JWT-based authentication (no sessions, no cookies)
- Resend for transactional email
- express-rate-limit

**Infrastructure**
- Frontend hosted on [Vercel](https://vercel.com)
- Backend hosted on [Render](https://render.com)
- Database hosted on [Neon](https://neon.tech)

## Project structure

The backend follows a feature-based module structure rather than a layer-based one — everything related to a single domain (auth, category, transaction, user) lives together:

```
backend/src/
├── modules/
│   ├── auth/          # register, login, Google OAuth, password reset, email verification
│   ├── category/      # category CRUD + default categories on signup
│   ├── transaction/    # transaction CRUD + chart summary endpoints
│   └── user/          # profile, password change, account deletion
├── middlewares/        # auth guard, error handler, rate limiter
├── exceptions/          # typed HTTP exceptions, one per module
└── lib/                 # Prisma client, Passport config, Resend client
```

The frontend groups pages and reusable pieces by responsibility, each in its own folder:

```
frontend/src/
├── pages/       # one folder per route
├── components/  # reusable UI pieces (Logo, Layout, ThemeToggle, charts, ...)
├── context/     # Auth and Theme context providers
├── api/         # axios client with auth interceptor
└── utils/       # shared helpers (currency formatting, ...)
```

## Getting started locally

### Prerequisites

- Node.js
- PostgreSQL (running locally, or a connection string to a hosted instance)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file with:

```
DATABASE_URL="postgresql://user:password@localhost:5432/flowly?schema=public"
JWT_SECRET="a-long-random-string"
PORT=4000

GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_CALLBACK_URL="http://localhost:4000/api/auth/google/callback"

FRONTEND_URL="http://localhost:5173"

RESEND_API_KEY="..."
```

Then run the migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file with:

```
VITE_API_URL="http://localhost:4000/api"
```

Then start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## License

Personal project, currently unlicensed.
