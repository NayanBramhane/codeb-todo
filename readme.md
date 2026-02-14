# Full-Stack Todo Application (MERN)

This is a professional-grade Task Management application built using the MERN stack (MongoDB, Express, React, Node.js). It features a robust authentication system, paginated data fetching, and a modern UI with debounced search.

## Features
- Authentication: JWT-based login and registration.

- CRUD Operations: Complete Create, Read, Update, and Delete functionality for tasks.

- Advanced Dashboard:

- Pagination: Server-side pagination with adjustable limits (10-100).

- Search: Debounced search (3-100 character validation) to reduce API load.

- UI/UX: Responsive grid layout with Shadcn/UI and Lucide icons.

- Database: MongoDB Atlas hosted in the Mumbai region.

## Setup Instructions
1. Database Configuration
Ensure your MongoDB Atlas IP Whitelist allows access (for development, use 0.0.0.0/0). If you experience connection issues, switch your local machine to Google DNS (8.8.8.8).

2. Backend Setup
```
cd server
npm install
```
### Create a .env file with:
- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- CLIENT_URL=your_frontend_url
```
npm run dev
```

3. Frontend Setup
```
cd client
npm install
npm start
```
## API Proxy
The frontend is configured to proxy requests from localhost:5173/api to localhost:3000 to handle CORS and simplify service calls.