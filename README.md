# IT Club Task Submission System

A full-stack web application for managing task submissions in an IT Club. The system allows members to submit tasks with screenshots, view approved submissions, and provides an admin panel for task management.

## Features

### For Members
- User registration and authentication
- Task submission with screenshot upload
- View approved task gallery
- Track submission status

### For Administrators
- User management
- Task approval/rejection
- Feedback system
- Analytics dashboard

## Tech Stack

### Frontend
- React.js
- Material-UI
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads

## Project Structure

```
it-club-task-submission/
├── frontend/           # React frontend application
├── backend/           # Node.js backend application
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd it-club-task-submission
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/it-club
JWT_SECRET=your_jwt_secret
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Tasks
- POST /api/tasks - Submit a new task
- GET /api/tasks - Get all tasks (filtered by user role)
- GET /api/tasks/:id - Get task details
- PATCH /api/tasks/:id/status - Update task status (admin only)
- DELETE /api/tasks/:id - Delete task (admin only)

### Users
- GET /api/users - Get all users (admin only)
- PATCH /api/users/:id/verify - Update user verification status (admin only)
- DELETE /api/users/:id - Delete user (admin only)

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- File upload validation
- Input sanitization
- Rate limiting
- CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Tailwind CSS for utility-first CSS
- MongoDB for the database
- Express.js for the backend framework 