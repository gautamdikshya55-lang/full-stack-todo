# Full-Stack Todo Application

This is a full-stack Todo application built with a React (Vite) and Tailwind CSS frontend, and a Node.js/Express backend connected to a PostgreSQL database through Prisma ORM. The app supports secure user authentication using JWT and provides full CRUD functionality for todos. The frontend communicates with the backend using the Fetch API and is deployed on Vercel, while the backend is deployed on Render.

#Project Links
- Demo Video (YouTube): (https://youtu.be/o2hfsZsYlAg)

- GitHub Repository:https://github.com/gautamdikshya55-lang/full-stack-todo.git

I.Frontend

Technologies used
- React 
- Vite
- TailwindCSS 
- Context API ( used for state management)

Setup instructions
1. Clone the repository:
   git clone https://github.com/gautamdikshya55-lang/full-stack-todo.git

2. Navigate to the frontend folder:
   cd Frontend

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

5. Build for production:
   npm run build

6. Preview production build:
   npm run preview

   Frontend features

#Core features
- Add new todo
- Edit existing todo
- Mark todo as complete or incomplete
- Delete todo
- List all todos
- Filter todos by All, Completed, Pending

#Bonus features (if implemented)
- Due dates and sorting (Latest, Oldest, Due Soon, Due Far)
- Display count of pending tasks
- Loading indicators during actions
- Client-side validation (disallow empty todos)
- Dark mode toggle
- Responsive design for mobile and desktop

#Deployment notes
Frontend (Vercel)
- Connect the GitHub repository to Vercel.
- Set the project root or build configuration to use the Frontend folder.
- Build command:
  npm run build
- Environment variables (example):
VITE_API_URL=https://backend-3vk4.onrender.com


#Live URL 
- Live Frontend (Vercel): : https://full-stack-todo-a7ia9aghq-gautamdikshya55-langs-projects.vercel.app


II.Backend

Technologies used
- Node.js
- Express.js (or Koa.js)
- PostgreSQL (or SQLite)
- Prisma ORM (or Sequelize)
- JSON Web Tokens (JWT)
- bcryptjs (for password hashing)

Setup instructions
1. Navigate to the backend folder:
   cd Backend

2. Install dependencies:
   npm install

3. Create a .env file in the Backend directory with values like:
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/todo"
   JWT_SECRET="your_jwt_secret"
   PORT=3000

4. Run database migrations:
   npm run prisma:migrate

5. Generate Prisma client:
   npm run prisma:generate

6.  Seed the database with sample data:
   npm run prisma:seed

7. Start the development server:
   npm run dev

   
#Backend features

#Core API endpoints
- POST /todos        Create a new todo
- GET /todos         Fetch all todos
- PUT /todos/:id     Update a todo (text and/or status)
- DELETE /todos/:id  Delete a todo

#Bonus features (implemented)
- JWT-based authentication
- User registration and login
- Todos associated with specific users
- Seed script to populate sample users and todos

#Deployment notes
  
Backend (Render or similar)
- Connect the Backend folder repository to Render (or other platform).
- Build command:
  npm install
- Start command:
  npm start    (or node index.js / npm run dev, depending on your setup)
- Environment variables:
  DATABASE_URL=your_production_database_url
  JWT_SECRET=your_secure_secret
  PORT=3000
Live URL 
- Backend API (Render): https://backend-3vk4.onrender.com

#Seed script

Seed script is available, it can be used to populate the database with demo data.

Command:
npm run prisma:seed

#Authentication

Authentication is implemented, protected routes require an Authorization header:

Authorization: Bearer <token>

Project structure

full-stack-todo/
  Frontend/   React or Next.js application
  Backend/    Node.js API with Express and Prisma


