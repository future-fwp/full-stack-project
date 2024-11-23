# Video Streaming Platform

A modern video streaming platform built with React, TypeScript, and Node.js, featuring a responsive design and smooth animations.

## Features

- 🎥 Video streaming with mock data integration
- 🔐 User authentication with JWT
- 📱 Responsive design for all screen sizes
- ✨ Smooth animations using Framer Motion
- 🎨 Modern UI with Tailwind CSS
- 🎯 TypeScript for better type safety
- 🚀 Fast and efficient MongoDB database

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-3
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:

Create a `.env` file in the server directory with the following content:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start the development servers:

```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from root directory)
npm run dev
```

## Project Structure

```
project-3/
├── src/                    # Frontend source files
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and API functions
│   └── store/             # State management
├── server/                 # Backend source files
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   └── middleware/    # Custom middleware
│   └── .env               # Environment variables
└── README.md              # Project documentation
```

## Features in Detail

### Authentication
- JWT-based authentication
- Secure password hashing
- Protected routes

### Video Platform
- Video grid layout
- Channel information
- View counts and timestamps
- Verified channel badges

### UI/UX
- Collapsible sidebar
- Responsive grid system
- Smooth animations
- User dropdown menu
- Dark mode support (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
