# Jitsi Meeting App

Full-stack video conferencing application using Jitsi Meet with React frontend and Express backend.

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

1. Install dependencies for all workspaces:
```bash
npm install
```

### Development

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

### Building for Production

```bash
npm run build
```

### Project Structure

- **frontend/**: React + Vite application
  - `src/App.jsx`: Main application component
  - `src/index.css`: Global styles
  - `vite.config.js`: Vite configuration with API proxy

- **backend/**: Express.js server
  - `server.js`: Main server file with API endpoints
  - `.env.example`: Environment variables template

### API Endpoints

- `GET /health`: Server health check
- `POST /api/meeting/create`: Create a new meeting room
- `GET /api/meeting/:roomName`: Get meeting information

### Technologies

- React 18
- Vite
- Express.js
- Jitsi Meet IFrame API
- CORS
- npm Workspaces

### Features

- Join video meetings with Jitsi Meet
- Create dynamic meeting rooms
- RESTful API for meeting management
- Full-stack JavaScript application

### Environment Variables

Create a `.env` file in the backend directory (copy from `.env.example`):

```
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Notes

- Make sure port 3000 (backend) and 5173 (frontend) are available
- The frontend proxies API requests to the backend
- Jitsi Meet API is loaded from the CDN in index.html
