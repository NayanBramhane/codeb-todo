# Todo App Backend

This is a RESTful backend API for a Todo application built using Node.js, Express, TypeScript, MongoDB, and JWT authentication.

## Tech Stack

- Node.js

- Express.js

- TypeScript

- MongoDB with Mongoose

- JWT for authentication

- express-validator for request validation

- bcryptjs for password hashing

## Features

- User registration and login

- JWT authentication using HTTP-only cookies

- Protected routes - Create, read, update, and delete todos

- Todos belong to specific users

- Input validation

- Centralized error handling

- Optimized database indexing

## Project Structure

src/

controllers/

middleware/

models/

routes/

utils/

config/

app.ts

index.ts

## Installation

Clone the repository
```
git clone <repository-url>

cd server
```
## Install dependencies

```
npm install
```

Create a .env file in the root directory
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```
NODE_ENV=Development

## Running the Project

Development mode:
```
npm run dev
```
Build:
```
npm run build
```
Start production build:
```
npm start
```
## API Endpoints

User Routes:
```
POST /api/v1/users/register
POST /api/v1/users/login
GET /api/v1/users/logout
```
Todo Routes:
```
POST /api/v1/todos
GET /api/v1/todos
PUT /api/v1/todos/:id
DELETE /api/v1/todos/:id
```
## Database Models

### User:

- email (unique)

- password (hashed)

- createdAt

- updatedAt

### Todo:

- title

- description

- isCompleted

- owner (reference to User)

- createdAt

- updatedAt

Compound index used on Todo:
owner + createdAt

## Security

- Passwords are hashed using bcryptjs

- JWT stored in HTTP-only cookies

- Protected routes using authentication middleware

- Input validation using express-validator

- Global error handler for consistent error responses

Scripts
```
dev: tsx watch src/index.ts
build: tsc
start: node dist/index.js
type-check: tsc --noEmit
lint: eslint .
format: prettier --write .
```
## Author

Nayan Bramhane