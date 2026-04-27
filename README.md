# Full Stack React Node MongoDB Project

This is a full stack application with React frontend, Node.js/Express backend, and MongoDB database, featuring user authentication.

## Project Structure

```
project/
├── backend/          # Node.js/Express server
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Custom middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── config/       # Configuration
│   ├── server.js     # Main server file
│   ├── package.json
│   └── .env          # Environment variables
└── frontend/         # React application
    ├── public/       # Static files
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── App.js       # Main app component
    │   ├── index.js     # Entry point
    │   └── index.css    # Global styles
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `.env` file with your MongoDB URI and a secure JWT secret:
   ```
   MONGO_URI=mongodb://localhost:27017/fullstack
   JWT_SECRET=your_secure_jwt_secret_here
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- React Router for navigation
- Axios for API calls

## Next Steps

- Add more features like user profiles, posts, etc.
- Implement proper error handling and validation
- Add testing
- Deploy to production