# Land Registration System

A comprehensive land registration and management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This system allows farmers to register and manage their land parcels while providing government officials with analytics and oversight capabilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development Guidelines](#development-guidelines)
- [License](#license)

## Features

### For Farmers
- User registration and authentication
- Land parcel registration and management
- Crop tracking and yield recording
- Water usage monitoring
- Sustainability score tracking
- Dashboard with analytics

### For Government Officials
- View all registered farmers and land parcels
- Analytics dashboard with regional sustainability metrics
- Soil type distribution analysis
- Policy management
- Reporting capabilities

## Technologies Used

### Frontend
- React 19
- React Router v7
- Tailwind CSS v4
- Vite 7
- Axios for API requests

### Backend
- Node.js
- Express.js v5
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Dotenv for environment management

### Database
- MongoDB

### Development Tools
- pnpm for package management
- ESLint for code linting
- Nodemon for development server auto-restart

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- pnpm (v7 or higher)
- MongoDB (v4.4 or higher)

## Project Structure

```
land-registration-system/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   └── package.json        # Backend dependencies
└── README.md               # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd land-registration-system
   ```

2. Install backend dependencies:
   ```bash
   cd server
   pnpm install
   cd ..
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   pnpm install
   cd ..
   ```

## Environment Variables

### Backend (.env in server directory)
```env
# Server Environment Variables
PORT=5000
NODE_ENV=development

# Database configuration
MONGO_URI=mongodb://localhost:27017/greenlands-db

# JWT configuration
JWT_SECRET=land_registration_secret_key
JWT_EXPIRE=7d

# Email configuration (for notifications)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env in client directory)
```env
# Client Environment Variables
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Land Registration System

# Development settings
NODE_ENV=development

# Feature flags
VITE_FEATURE_ANALYTICS=true
VITE_FEATURE_LAND_MANAGEMENT=true
```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd server
   pnpm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Mode

1. Build the frontend:
   ```bash
   cd client
   pnpm run build
   ```

2. Start the backend server:
   ```bash
   cd server
   pnpm start
   ```

3. The application will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Land Management (Farmer)
- `POST /api/land` - Create a new land parcel (protected)
- `GET /api/land` - Get all land parcels for a farmer (protected)
- `GET /api/land/:id` - Get a specific land parcel (protected)
- `PUT /api/land/:id` - Update a land parcel (protected)
- `DELETE /api/land/:id` - Delete a land parcel (protected)
- `POST /api/land/:id/crops` - Add crop to land parcel (protected)
- `POST /api/land/:id/water` - Add water usage record (protected)

### Government
- `GET /api/government/analytics` - Get analytics data (protected, government only)
- `GET /api/government/farmers` - Get all farmers (protected, government only)
- `GET /api/government/lands` - Get all land parcels (protected, government only)

## Development Guidelines

### Code Style
- Follow the existing code style in the project
- Use functional components in React
- Use async/await for asynchronous operations
- Write meaningful commit messages

### Branching Strategy
- Create feature branches from `main`
- Use descriptive branch names (e.g., `feature/user-authentication`)
- Create pull requests for code review

### Testing
- Write unit tests for critical functionality
- Test API endpoints with tools like Postman
- Ensure cross-browser compatibility

### Security
- Never commit sensitive information to the repository
- Use environment variables for configuration
- Validate and sanitize all user inputs
- Implement proper authentication and authorization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact the development team or open an issue in the repository.