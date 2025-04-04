# Todo List Application

A full-stack web application for managing todo tasks with user authentication.

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Bootstrap for UI components

### Backend
- Node.js with Express.js
- MongoDB with Mongoose for data modeling
- JWT for authentication

## Project Structure

```
digital_factory/
├── frontend/         # React frontend application
├── backend/          # Node.js backend API
├── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```
   npm start
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Features

- User registration and login
- Create, read, update, and delete tasks
- User-specific task management
- Responsive design

## API Endpoints

- **POST /api/register**: Register a new user
- **POST /api/login**: Authenticate a user
- **GET /api/tasks**: Get all tasks for the authenticated user
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/:id**: Update an existing task
- **DELETE /api/tasks/:id**: Delete a task
