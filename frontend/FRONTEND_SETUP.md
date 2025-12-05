# Frontend Optimization & Backend Integration

This frontend has been optimized and integrated with the HealthPal backend API.

## Key Improvements

### 1. **API Client Module** (`lib/apiClient.js`)
   - Centralized API communication
   - Automatic token management for authentication
   - Error handling and logging
   - Support for all backend endpoints

### 2. **Custom React Hooks** (`hooks/useAPI.js`)
   - `useFetch()` - For GET requests with loading/error states
   - `useMutation()` - For POST/PUT/DELETE requests
   - Automatic refetch capability
   - Proper state management

### 3. **Optimized Pages**
   - **Home** - Enhanced hero section with feature cards and CTA
   - **Patients** - Grid display with loading states and error handling
   - **Consultations** - Full CRUD with form to schedule appointments
   - **Donations** - Progress bars and formatted currency
   - **Alerts** - Priority-based color coding and styling

### 4. **Enhanced Layout Component**
   - Sticky navigation header
   - Comprehensive footer with quick links
   - Responsive design for mobile and desktop
   - Gradient backgrounds and modern styling

### 5. **Performance Features**
   - Loading spinners for better UX
   - Error boundaries with user-friendly messages
   - Refresh buttons on all pages
   - Tailwind CSS for optimized styling

## Environment Configuration

### Backend API Setup

1. **Set Backend Port** (in `/src/server.js`):
```javascript
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

2. **Enable CORS** (in `/src/app.js`):
```javascript
import cors from 'cors';
app.use(cors());
```

3. **Run Backend**:
```bash
npm install cors
NODE_ENV=test npm start  // Or just npm start for production
```

### Frontend API Configuration

The frontend uses `NEXT_PUBLIC_API_BASE_URL` from `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Change this if your backend runs on a different host/port.

## Running the Application

### Terminal 1 - Backend Server
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal
npm install cors  # Add CORS support
NODE_ENV=test npm start
```

### Terminal 2 - Frontend Development
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal/frontend
npm install
npm run dev
```

### Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## API Endpoints Integrated

- `GET /users/patients` - List all patients
- `GET /consultations` - List consultations
- `POST /consultations` - Create consultation
- `GET /alerts` - List health alerts
- `GET /donations` - List donations
- `GET /users/login` - User login
- `POST /users/signup` - User registration

## Frontend Features

### Data Fetching Pattern
```javascript
import { useFetch } from "../hooks/useAPI";
import { apiClient } from "../lib/apiClient";

const { data, loading, error, refetch } = useFetch(
    () => apiClient.getPatients(),
    []
);
```

### Form Handling Pattern
```javascript
import { useMutation } from "../hooks/useAPI";

const { execute, loading, error } = useMutation(
    apiClient.createConsultation.bind(apiClient)
);

const handleSubmit = async (data) => {
    try {
        await execute(data);
        refetch();
    } catch (err) {
        console.error(err);
    }
};
```

## Styling & Tailwind Configuration

All pages use Tailwind CSS with:
- Responsive grid layouts
- Gradient backgrounds
- Hover effects and transitions
- Loading spinners
- Error message styling
- Mobile-first design

## Next Steps

1. Add authentication pages (login/signup)
2. Implement user profiles
3. Add search and filtering
4. Implement real-time notifications
5. Add image uploads
6. Create admin dashboard

## Troubleshooting

### CORS Errors
- Add `cors` package to backend: `npm install cors`
- Import and use in `/src/app.js`:
  ```javascript
  import cors from 'cors';
  app.use(cors());
  ```

### API Not Found Errors
- Verify backend is running on port 5000
- Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
- Ensure backend endpoints match the API client calls

### Token Issues
- Login token is stored in localStorage
- Token is automatically sent in Authorization header
- Clear localStorage if having auth issues
