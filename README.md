# WorkFlowHub

A full-stack project management and task tracking platform, built to simulate a real internal tool that teams use to organize projects, assign work, track progress, and collaborate. It's similar in spirit to Jira or Asana, scoped down for a portfolio and learning project.

## Status

✅ **Frontend complete (running on mock data).** All screens are built and interactive.
🚧 **Backend not started yet.** There is no database or API connected, so:

- Login and signup are **simulated**. Any validly formatted email and password gets you in. Real authentication comes with the backend.
- Data lives in memory, so it **resets on page refresh**.
- Notifications are sample data. Email reminders are planned for the backend phase.

## Tech Stack

**Frontend (current)**
- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui (Base UI)
- React Hook Form + Zod (form validation)
- Lucide React (icons)
- Recharts (dashboard charts)

**Backend (planned)**
- FastAPI
- PostgreSQL + SQLAlchemy
- JWT authentication
- Axios + TanStack Query on the frontend for API integration
- Email service for deadline reminders

## Features

- **Auth screens:** login and signup with validation, logout, and route protection that redirects logged-out users to login (simulated for now)
- **Dashboard:** project and task stats, task overview chart, and recent tasks
- **Projects:** project cards with progress, create project, project details with tabs (Overview / Tasks / Members / Activity), and delete with confirmation
- **Tasks:** My Tasks list, create task, task details with comments, and delete with confirmation
- **Search:** the top bar search filters projects and tasks
- **Notifications:** bell icon with unread count, dropdown, a full notifications page, and mark as read
- **Profile and Settings:** profile page, plus a settings page with notification preferences
- **UX:** loading skeletons, empty states, inline form errors, and a responsive layout with a mobile slide-out menu

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be sent to the login page. Enter any valid email and any password to sign in.

## Project Structure

```
src/
├── app/            # Pages (Next.js App Router)
│   ├── (dashboard)/  # Pages behind the sidebar layout and route guard
│   ├── login/
│   └── signup/
├── components/     # Reusable UI (layout, dashboard, projects, tasks, notifications, auth, shared, ui)
├── data/           # Mock data (temporary, until the backend is connected)
├── lib/            # Validation schemas and utilities
├── providers/      # Shared app state (React Context)
└── types/          # TypeScript type definitions
```

## Roadmap

**Frontend**
- [x] All core screens and navigation
- [x] Project and task create, view, and delete
- [x] Form validation
- [x] Login and signup (simulated) with route protection
- [x] Settings page
- [x] Delete confirmation dialogs
- [x] Loading skeletons and empty states
- [x] Search and notifications UI
- [x] Responsive layout

**Backend and integration**
- [ ] FastAPI project and PostgreSQL schema
- [ ] JWT authentication (replace simulated login)
- [ ] Project and task CRUD APIs
- [ ] Connect the frontend to real APIs (replace mock data)
- [ ] Persistent notifications
- [ ] Email deadline reminders
- [ ] Role-based permissions
- [ ] Deployment (Vercel + backend host + PostgreSQL)

## License

Personal project, not currently licensed for reuse.