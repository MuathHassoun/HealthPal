# HealthPal - Frontend & Backend Integration Guide

## Overview

The HealthPal application consists of a **Next.js frontend** and an **Express.js backend** connected via a modern REST API with proper CORS support.

### Architecture

```
┌─────────────────────────────────────────────┐
│         Next.js Frontend (Port 3000)        │
│  - React components with Tailwind CSS       │
│  - API Client for backend communication     │
│  - Custom hooks for data management         │
└──────────────┬──────────────────────────────┘
               │ HTTP/REST API
               ▼
┌─────────────────────────────────────────────┐
│  Express.js Backend (Port 5000)             │
│  - REST API endpoints                       │
│  - Sequelize ORM with SQLite (test)         │
│  - JWT authentication                       │
│  - CORS enabled for frontend                │
└─────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Terminal access

### Step 1: Install Backend Dependencies

```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal/frontend
npm install
```

## Running the Application

### Option A: Dual Terminal Setup (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal
npm start
```
Expected output:
```
Server running on port 5000
```

**Terminal 2 - Frontend Development:**
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal/frontend
npm run dev
```
Expected output:
```
▲ Next.js 16.0.4
- Local: http://localhost:3000
```

### Option B: Running Tests

**Test Backend:**
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal
npm test
```

## Frontend Structure

### Key Files

```
frontend/
├── pages/              # Next.js pages (auto-routed)
│   ├── index.js       # Home page
│   ├── patients.js    # Patients listing
│   ├── consultations.js
│   ├── alerts.js
│   └── donations.js
├── components/        # Reusable React components
│   └── Layout.js      # Main layout wrapper
├── hooks/            # Custom React hooks
│   └── useAPI.js     # Data fetching hooks
├── lib/              # Utility modules
│   └── apiClient.js  # API communication layer
├── styles/           # CSS files
│   └── globals.css
└── .env.local        # Environment variables
```

### Pages & Routes

| Route | Purpose | Features |
|-------|---------|----------|
| `/` | Home page | Hero section, features, stats |
| `/patients` | Patient list | Grid display, search, filters |
| `/consultations` | Consultation booking | List, create, status tracking |
| `/alerts` | Health alerts | Priority levels, timestamps |
| `/donations` | Donation campaigns | Progress bars, donation tracking |

## Backend Structure

### Key Files

```
src/
├── app.js            # Express app setup with CORS
├── server.js         # Server entry point
├── config/           # Configuration
│   ├── db.js        # Database connection
│   └── env.js       # Environment variables
├── models/           # Sequelize models
│   ├── User.js
│   ├── Patient.js
│   ├── Doctor.js
│   ├── Consultation.js
│   └── index.js
├── controllers/      # Request handlers
├── services/         # Business logic
├── routes/           # API route definitions
└── middleware/       # Express middleware
    ├── auth.js      # JWT authentication
    └── role.js      # Role-based access control
```

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/signup` - User registration
- `GET /api/users/me` - Get current user

### Patients
- `GET /api/users/patients` - List all patients
- `GET /api/users/patients/:id` - Get patient details

### Consultations
- `GET /api/consultations` - List consultations
- `POST /api/consultations` - Create consultation
- `GET /api/consultations/:id` - Get consultation details
- `PUT /api/consultations/:id` - Update consultation
- `DELETE /api/consultations/:id` - Delete consultation

### Alerts
- `GET /api/alerts` - List health alerts

### Donations
- `GET /api/donations` - List donations

### Mental Support
- `GET /api/mental-support` - List support sessions
- `POST /api/mental-support` - Create session

## Frontend Features

### API Client (`lib/apiClient.js`)

The `apiClient` is a singleton that handles all API communication:

```javascript
import { apiClient } from '../lib/apiClient';

// Fetching data
const patients = await apiClient.getPatients();

// Creating resources
const consultation = await apiClient.createConsultation({
    doctor_id: 1,
    patient_id: 2,
    type: 'video',
    date: new Date(),
    notes: 'Checkup'
});

// Token management
apiClient.setToken(token);
apiClient.clearToken();
```

### Custom Hooks (`hooks/useAPI.js`)

#### useFetch Hook
```javascript
const { data, loading, error, refetch } = useFetch(
    () => apiClient.getPatients(),
    [] // dependency array
);

// Auto-fetch on mount, refetch on demand
```

#### useMutation Hook
```javascript
const { execute, loading, error, success } = useMutation(
    apiClient.createConsultation.bind(apiClient)
);

const handleSubmit = async (data) => {
    try {
        const result = await execute(data);
        console.log('Success:', result);
    } catch (err) {
        console.error('Error:', err);
    }
};
```

## Environment Configuration

### Backend (`.env`)
```env
NODE_ENV=test
DB_CONFIG={"dialect":"sqlite","storage":"file::memory:?cache=shared"}
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Data Flow Example

### Fetching Patients

1. **Frontend Component** calls `useFetch()`
2. **API Client** makes GET request to `/api/users/patients`
3. **Backend Route Handler** receives request
4. **Controller** validates and processes request
5. **Service** performs business logic
6. **Model** queries database
7. **Response** sent back to frontend
8. **Component** updates with new data

```javascript
// Frontend
const { data: patients, loading, error } = useFetch(
    () => apiClient.getPatients(),
    []
);

// Backend
GET /api/users/patients
→ userController.getAllPatients()
→ userService.getPatients()
→ Patient.findAll()
→ res.json(patients)
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test -- tests/consultation.model.test.js
```

### Test Results
- **Passing Tests**: 25+ 
- **Database**: SQLite in-memory (test mode)
- **Environment**: NODE_ENV=test

## Common Issues & Solutions

### Issue: CORS Error
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Verify cors is installed: `npm install cors`
2. Check CORS is enabled in `/src/app.js`
3. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`

### Issue: API Connection Failed
**Error**: `Failed to fetch http://localhost:5000/api/...`

**Solution**:
1. Ensure backend is running: `npm start`
2. Check backend is on port 5000
3. Verify frontend .env.local points to correct API URL

### Issue: Authentication Failed
**Error**: `401 Unauthorized`

**Solution**:
1. Clear browser localStorage
2. Re-login with valid credentials
3. Check JWT secret matches between backend and frontend

### Issue: Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

## Performance Optimization

### Frontend
- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ CSS optimization with Tailwind
- ✅ Memoization for expensive operations

### Backend
- ✅ Database query optimization
- ✅ Eager loading of associations
- ✅ Connection pooling
- ✅ Pagination ready

## Security Measures

### Frontend
- ✅ XSS protection with React
- ✅ CSRF token support ready
- ✅ Secure localStorage for tokens

### Backend
- ✅ JWT authentication
- ✅ CORS validation
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling without exposing internals

## Deployment

### Production Build

**Frontend**:
```bash
cd frontend
npm run build
npm start
```

**Backend**:
```bash
NODE_ENV=production npm start
```

### Environment Variables for Production

```env
# Backend
NODE_ENV=production
DB_HOST=your-mysql-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=healthpal_db
JWT_SECRET=secure-random-key
FRONTEND_URL=https://your-domain.com

# Frontend (.env.local or .env.production)
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
```

## Next Steps

### Short Term
1. Add authentication pages (login/signup)
2. Implement user profile pages
3. Add search and filtering
4. Implement pagination

### Medium Term
1. Add real-time notifications with WebSockets
2. Implement image uploads
3. Create admin dashboard
4. Add appointment reminders

### Long Term
1. Mobile app with React Native
2. Payment integration for donations
3. AI-powered health recommendations
4. Video consultation integration

## Support

For issues or questions:
1. Check the error message and this guide
2. Review backend tests: `npm test`
3. Check browser console for frontend errors
4. Review backend logs for API errors

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Tailwind CSS](https://tailwindcss.com/)
