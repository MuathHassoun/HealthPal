# HealthPal Frontend-Backend Integration - Reference Card

## Three Steps to Run

```bash
# 1. Install (do once)
npm install && cd frontend && npm install && cd ..

# 2. Terminal 1: Backend
npm start

# 3. Terminal 2: Frontend  
cd frontend && npm run dev
```

**Then visit**: `http://localhost:3000`

---

## Frontend Pages

| Page | URL | Status | Features |
|------|-----|--------|----------|
| Home | `/` | ✅ | Hero, features, stats, alerts |
| Patients | `/patients` | ✅ | List, search, cards |
| Consultations | `/consultations` | ✅ | Book, list, status |
| Alerts | `/alerts` | ✅ | Priority colors, timestamps |
| Donations | `/donations` | ✅ | Progress bars, campaigns |

---

## API Endpoints

```javascript
// Patients
apiClient.getPatients()           // GET /api/users/patients
apiClient.getPatient(id)          // GET /api/users/patients/:id

// Consultations
apiClient.getConsultations()      // GET /api/consultations
apiClient.createConsultation(data)// POST /api/consultations
apiClient.getConsultation(id)     // GET /api/consultations/:id

// Alerts
apiClient.getAlerts()             // GET /api/alerts

// Donations
apiClient.getDonations()          // GET /api/donations

// Auth
apiClient.login(email, password)  // POST /api/users/login
apiClient.signup(userData)        // POST /api/users/signup
```

---

## Using Hooks

```javascript
// Fetch data
const { data, loading, error, refetch } = useFetch(
    () => apiClient.getPatients(),
    []
);

// Submit form
const { execute, loading, error } = useMutation(
    apiClient.createConsultation.bind(apiClient)
);

const submit = async (data) => {
    try {
        await execute(data);
    } catch (err) {
        console.error(err);
    }
};
```

---

## File Structure

```
HealthPal/
├── src/
│   ├── app.js              ← CORS enabled
│   ├── server.js
│   ├── controllers/        ← API handlers
│   ├── models/            ← Database schemas
│   ├── routes/            ← API routes
│   ├── services/          ← Business logic
│   └── middleware/        ← Auth, validation
│
├── frontend/
│   ├── pages/             ← 5 working pages
│   ├── components/
│   │   └── Layout.js      ← Nav + Footer
│   ├── lib/
│   │   └── apiClient.js   ← API wrapper
│   ├── hooks/
│   │   └── useAPI.js      ← Fetch hooks
│   └── .env.local         ← Config
│
├── tests/                 ← 25+ tests
├── package.json           ← Dependencies
├── SETUP_GUIDE.md         ← Full reference
├── QUICK_START.md         ← This file
└── OPTIMIZATION_SUMMARY.md
```

---

## Testing

```bash
# All tests
npm test

# Specific test
npm test -- tests/consultation.model.test.js

# Watch mode
npm test -- --watch

# Results: 25+ passing with SQLite
```

---

## Environment Variables

### Backend
```env
NODE_ENV=test              # test or production
JWT_SECRET=your_secret     # For token signing
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## Development Commands

### Backend
```bash
npm start           # Run server
npm test            # Run tests
npm test -- --watch # Watch tests
```

### Frontend
```bash
cd frontend
npm run dev         # Dev server
npm run build       # Production build
npm start          # Run built app
npm test           # Run tests
```

---

## Troubleshooting Quick Fix

| Problem | Command |
|---------|---------|
| Port 5000 in use | `lsof -i :5000 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| Port 3000 in use | `lsof -i :3000 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| Clear cache | `rm -rf .next && npm run dev` |
| Auth issues | Clear localStorage in DevTools |
| Fresh start | Delete node_modules, npm install |

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│  User Browser (http://localhost:3000)   │
│                                         │
│  Next.js Frontend                       │
│  - React Components                     │
│  - Tailwind CSS                         │
│  - Custom Hooks (useAPI)                │
│  - API Client Wrapper                   │
└──────────────────┬──────────────────────┘
                   │
         HTTP/REST │ API Calls
                   │
                   ↓
┌──────────────────────────────────────────┐
│  Node.js Server (http://localhost:5000)  │
│                                          │
│  Express.js Backend                      │
│  - REST API Routes                       │
│  - Controllers & Services                │
│  - Sequelize ORM                         │
│  - JWT Authentication                    │
│  - CORS Enabled                          │
└───────────────────┬──────────────────────┘
                    │
         SQL Query  │
                    │
                    ↓
        ┌─────────────────────┐
        │  Database           │
        │                     │
        │  SQLite (test)      │
        │  MySQL (production) │
        └─────────────────────┘
```

---

## Common Workflows

### View Patient List
```javascript
1. User opens /patients
2. useFetch calls apiClient.getPatients()
3. API request sent to backend
4. Backend queries database
5. Results returned and displayed
```

### Book Consultation
```javascript
1. User fills form on /consultations
2. useMutation.execute() called
3. apiClient.createConsultation() sends POST
4. Backend validates and creates record
5. refetch() updates list
```

### Real-time Token Refresh
```javascript
1. User logs in
2. Token stored in localStorage
3. apiClient automatically includes in headers
4. On 401, token cleared
5. User sent to login page
```

---

## Checklist for Running

- [ ] Node.js 16+ installed
- [ ] `npm install` in backend directory
- [ ] `npm install` in frontend directory
- [ ] Backend starts: `npm start`
- [ ] Frontend starts: `cd frontend && npm run dev`
- [ ] Home page loads: `http://localhost:3000`
- [ ] No console errors
- [ ] API calls work

---

## Documentation Files

| File | Length | Purpose |
|------|--------|---------|
| QUICK_START.md | 1 page | This quick ref |
| SETUP_GUIDE.md | 8 pages | Full reference |
| OPTIMIZATION_SUMMARY.md | 3 pages | Overview |
| FILES_CREATED_MODIFIED.md | 4 pages | Changes made |
| frontend/FRONTEND_SETUP.md | 5 pages | Frontend guide |

---

## Code Examples

### Fetch and Display
```javascript
export default function Patients() {
    const { data, loading, error } = useFetch(
        () => apiClient.getPatients(), []
    );
    
    return loading ? <Spinner /> 
        : error ? <Error msg={error} /> 
        : <Grid>{data.map(p => <Card key={p.id} patient={p} />)}</Grid>;
}
```

### Create with Form
```javascript
const { execute, loading } = useMutation(
    apiClient.createConsultation.bind(apiClient)
);

const handleSubmit = async (formData) => {
    try {
        await execute(formData);
        refetch();
    } catch (err) {
        setError(err.message);
    }
};
```

---

## Performance Tips

- Frontend: Built-in Next.js optimization
- Backend: Connection pooling enabled
- Database: Indexed queries, eager loading
- Styling: Tailwind CSS minified
- Caching: localStorage for tokens

---

## Responsive Breakpoints

```css
Mobile:  320px - 640px   (Fully supported)
Tablet:  641px - 1024px  (Fully supported)
Desktop: 1025px+         (Fully supported)
```

---

## Quick Commands Summary

```bash
# Start both (in 2 terminals)
Terminal 1: npm start
Terminal 2: cd frontend && npm run dev

# Testing
npm test

# Production
npm run build && npm start

# Clean build
rm -rf node_modules .next && npm install && npm run dev
```

---

## Included Features

✅ 5 working pages  
✅ API integration  
✅ Loading states  
✅ Error handling  
✅ Responsive design  
✅ JWT auth framework  
✅ CORS support  
✅ 25+ tests passing  
✅ Complete documentation  
✅ Code examples  

---

**Version**: 1.0  
**Status**: ✅ Production Ready  
**Last Updated**: December 5, 2025