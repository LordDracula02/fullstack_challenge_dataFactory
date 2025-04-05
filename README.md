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

### Testing
- Jest for unit testing
- Axios for API testing

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

- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: Authenticate a user
- **GET /api/users/profile**: Get authenticated user's profile
- **GET /api/tasks**: Get all tasks for the authenticated user
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/:id**: Update an existing task
- **DELETE /api/tasks/:id**: Delete a task

## Deployment

### Backend Deployment (Render)

1. Sign in to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: todo-app-backend (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add the same variables from your `.env` file
5. Click 'Create Web Service'

### Frontend Deployment (Render)

1. Sign in to [Render](https://render.com/)
2. Create a new Static Site
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: todo-app-frontend (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**: Add `REACT_APP_API_URL` pointing to your backend URL
5. Click 'Create Static Site'

Frontend Deployment Link: [https://todo-app-frontend.onrender.com](https://todo-app-frontend.onrender.com)

## Unit Testing

### Backend API Tests

The application uses Jest for unit testing the API endpoints.

**Test File Location**: `backend/api.test.js`

**Running Tests**:

1. Make sure your backend server is running:
   ```
   cd backend
   npm run dev
   ```

2. In a separate terminal, run the tests:
   ```
   cd backend
   npm test
   ```

The tests cover all API endpoints including:
- User registration (success and failure cases)
- User login (success and failure cases)
- User profile retrieval
- Task creation, retrieval, updating, and deletion
