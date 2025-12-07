# Frontend TODO UI
A simple, clean, and fully functional Todo application built with React, Vite, and TailwindCSS.
Includes task creation, editing, validation, sorting, filtering, and theme switching.

#Core Features
-Add new todo
-Edit existing todo
-Mark todos as complete or incomplete
-Delete todo
-Display numbered todo list
-Filter todos by All, Completed, Pending

#Advanced Features
-Smart validation
-Duplicate prevention
-Meaningless-task filtering
-Due date selectiono
-Edit due dates
-Sorting (Latest, Oldest, Due Soon, Due Far)
-Pending task count
-LocalStorage persistence
-Loading indicators
-Responsive UI
-Dark and Light mode

#Technologies Used
-React
-Vite
-TailwindCSS
-Context API
-React Router
-JavaScript (ES6+)

#Installation
1. Clone the repository
git clone https://github.com/gautamdikshya55-lang/full-stack-todo.git
cd Frontend
2. Install dependencies
npm install

3. Run development server
npm run dev

4. Build project
npm run build

5. Preview production build
npm run preview
 
 # Backend TODO-API

This is the backend API for  Todo Application.  
It provides secure authentication using JWT and allows each user to manage their own todos (CRUD + due dates).

#Core Features
- Register new users  
- Login with JWT Authentication  
- Create todos  
- Edit todos (text, completed status, due date)  
- Delete todos  
- Fetch todos belonging only to the logged-in user

#Security Features
- Password hashing using *bcryptjs*
- JWT-based authentication middleware
- Protected todos routes (only logged-in users can access)

#Database Features
- PostgreSQL with Prisma ORM  
- User ↔ Todo relational mapping  
- Auto timestamps (`createdAt`, `updatedAt`)
- Due date support (nullable)

#Seed Script
Includes a seed script to populate the database with:
- 1 demo user (`demo@example.com`)
- 3 sample todos

#Tech Stack
-Runtime: Node.js
-Framework: Express.js
-Database: PostgreSQL
-ORM: Prisma
-Authentication: JWT + bcryptjs

#Installation & Setup
1. Install Dependencies
   npm install
2. Create Environment Variables

Create a file named .env inside the Backend folder with the following:

#Run database migrations:
npm run prisma:migrate

#Generate Prisma Client:
npm run prisma:generate

#Seed demo data:
npm run prisma:seed

#Start the server:
npm run dev

#Server URL:
http://localhost:3000

#Authentication
Method: JWT

Header Format:
Authorization: Bearer <token>

-Register (POST /auth/register):

{
  "email": "user@example.com",
  "password": "password123"
}

-Login (POST /auth/login):

{
  "token": "jwt-token-here"
}


-Todos API
Create Todo (POST /todos):

{
  "text": "Buy milk",
  "dueDate": "2025-12-30"
}


-Get All Todos:
GET /todos

-Update Todo (PUT /todos/:id):
{
  "text": "Updated text",
  "completed": true,
  "dueDate": "2025-12-28"
}

-Delete Todo:
DELETE /todos/:id

#Seed Script
File: prisma/seed.js
Creates:
Demo user
Three preloaded todos
Run:
npm run prisma:seed

#Testing
-Register: POST /auth/register
-Login: POST /auth/login
-Create todo: POST /todos
-Get todos: GET /todos
-Update todo: PUT /todos/:id
-Delete todo: DELETE /todos/:id

