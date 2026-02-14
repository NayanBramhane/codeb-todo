# Todo Application - Frontend
A modern, responsive Task Management dashboard built with React 19, TypeScript, and Shadcn/UI. This frontend communicates with a Node.js/Express backend to provide a seamless CRUD experience with advanced features like debounced searching and dynamic pagination.

## Key Features
- Secure Authentication: Integrated with a JWT-based backend for Login and Registration.

- Dynamic Dashboard: A grid-based layout for managing tasks efficiently with specialized views for different item counts.

- Smart Search: Implemented Debounced Search (500ms) with 3–100 character validation to optimize API calls.

- State Management: Utilizes React Context API for global authentication state to persist user emails across the dashboard.
### Advanced CRUD:

- Create: Modal-based task creation with Zod validation (minimum 3 characters).

- Read: Paginated view with adjustable rows-per-page (10, 25, 50, 100).

- Update: Inline status toggling via interactive icons and full-detail editing via multi-purpose dialogs.

- Delete: Instant removal of tasks with UI synchronization and callback refreshes.



## Tech Stack
- Framework: React 19 (Vite)

- Language: TypeScript

- Styling: Tailwind CSS & Shadcn/UI

- Form Handling: React Hook Form & Zod

- Icons: Lucide React

- API Client: Axios with custom instances

## Getting Started
### Prerequisites
- Node.js: v18 or higher

- Backend: Ensure the Express server is running on http://localhost:3000

### Installation

- Clone and Install

```
git clone <your-repo-url>
cd todo-app/client
npm install
```
- Configure Environment
Ensure your vite.config.ts includes the proxy for /api to avoid CORS issues.

- Start Development

```
npm run dev
```