# CashDash
[DEPRECATED] dashboard webapp offering an universal, unified overview of a user's personal finances. Personal project for learning Full Stack Web Development.

## 🚀 Vercel Deployment

This project is configured for deployment on Vercel with serverless functions.

### Prerequisites
- GitHub account
- Vercel account (connect with GitHub)
- Supabase account with your database set up

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variable:
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - Available for: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Project Structure
```
CashDash/
├── frontend/                # Public-facing frontend files
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── css/
│   ├── js/
│   └── assets/
├── api/                     # Vercel serverless API functions
│   ├── login.js
│   ├── register.js
│   └── test.js
├── backend/                 # Optional local Express backend (legacy/local use)
├── vercel.json              # Vercel function runtime config
├── package.json             # Root runtime dependencies
└── .env.example             # Environment variable template

```

### Deployment Root
- Vercel project root should be repository root (`/`).
- `vercel.json` rewrites public URLs (`/`, `/login.html`, `/css/*`, `/js/*`) to files under `frontend/`.
- Keep API functions in root `api/` so `/api/*` remains serverless.

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Run locally with Vercel CLI**
   ```bash
   npm run dev
   ```
   This starts Vercel's local development server at `http://localhost:3000`

4. **Alternative: Run Express backend locally**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend runs on `http://localhost:5501`

### Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

### Features
- User registration and authentication
- Financial dashboard (coming soon)
- Budget tracking (coming soon)
- Expense logging (coming soon)
