# WorkFlowHub

A full-stack project management and task tracking platform, built to simulate a real internal tool teams use to organize projects, assign work, track progress, and collaborate — similar in spirit to Jira or Asana, scoped down for a portfolio/learning project.

## Status

🚧 **Frontend in progress.** Currently running on in-memory mock data — no backend yet. Screens are fully interactive (create/view projects and tasks, form validation, responsive layout), but data resets on page refresh since there's no database connected yet.

## Tech Stack

**Frontend (current)**
- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod (form validation)
- Lucide React (icons)
- Recharts (dashboard charts)
- Axios + TanStack Query (planned, for backend integration)

**Backend (planned)**
- FastAPI
- PostgreSQL + SQLAlchemy
- JWT authentication

## Features (frontend)

- Dashboard with project/task stats and activity chart
- Project list, project details with tabs (Overview / Tasks / Members / Activity), create-project flow
- Task list ("My Tasks"), task details with comments, create-task flow
- Profile page
- Responsive sidebar (collapses to a mobile slide-out menu)
- Form validation with inline error messages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure