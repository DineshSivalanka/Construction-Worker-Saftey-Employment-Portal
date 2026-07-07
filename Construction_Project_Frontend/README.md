# Construction Worker Portal - React Frontend

## Project Structure

```
src/
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Worker/
│   │   ├── WorkerDashboard.jsx
│   │   ├── WorkerProfile.jsx
│   │   ├── AvailableJobs.jsx
│   │   ├── JobDetails.jsx
│   │   └── MyApplications.jsx
│   ├── Contractor/
│   │   ├── ContractorDashboard.jsx
│   │   ├── ContractorProfile.jsx
│   │   ├── PostJob.jsx
│   │   ├── MyJobs.jsx
│   │   ├── Applicants.jsx
│   │   └── EditJob.jsx
│   └── Admin/
│       └── AdminDashboard.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── workerService.js
│   ├── contractorService.js
│   └── adminService.js
│
├── context/
│   └── AuthContext.jsx (placeholder)
│
├── styles/
│   └── index.css
│
├── App.jsx
└── main.jsx
```

## Setup Instructions

### 1. Install Dependencies
All dependencies have been pre-installed:
- **React 19.2.7** - React framework
- **React Router 7.18.1** - Routing
- **Axios 1.18.1** - HTTP client
- **Tailwind CSS** - Styling
- **Vite 8.1.3** - Build tool

### 2. Start Development Server
```bash
npm run dev
```
The app will run on `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Available Routes

| Route | Component | Role |
|-------|-----------|------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/worker/dashboard` | Worker Dashboard | Worker |
| `/worker/jobs` | Available Jobs | Worker |
| `/worker/jobs/:id` | Job Details | Worker |
| `/worker/applications` | My Applications | Worker |
| `/worker/profile` | Worker Profile | Worker |
| `/contractor/dashboard` | Contractor Dashboard | Contractor |
| `/contractor/post-job` | Post Job | Contractor |
| `/contractor/jobs` | My Jobs | Contractor |
| `/contractor/applicants` | Applicants | Contractor |
| `/contractor/jobs/:id/edit` | Edit Job | Contractor |
| `/contractor/profile` | Contractor Profile | Contractor |
| `/admin/dashboard` | Admin Dashboard | Admin |

## Styling

The app uses **Tailwind CSS** with a construction-themed color scheme:

- **Primary:** Orange (#F97316)
- **Secondary:** Blue (#2563EB)
- **Background:** White
- **Success:** Green (#16A34A)
- **Danger:** Red (#DC2626)
- **Info:** Purple (#7C3AED)

## API Integration

All API calls are handled through services in the `services/` folder.

### API Configuration
- **Base URL:** `http://localhost:8080/api`
- **File:** `src/services/api.js`

### Available Services

**authService.js**
```javascript
login(payload)        // POST /auth/login
register(payload)     // POST /auth/register
```

**workerService.js**
```javascript
getJobs()             // GET /jobs
getJobById(id)        // GET /jobs/:id
applyJob(id)          // POST /jobs/:id/apply
getApplications()     // GET /applications
```

**contractorService.js**
```javascript
createJob(payload)    // POST /jobs
getMyJobs()           // GET /contractor/jobs
getApplicants(jobId)  // GET /jobs/:jobId/applicants
```

**adminService.js**
```javascript
getDashboardStats()   // GET /admin/dashboard
getWorkers()          // GET /admin/workers
getContractors()      // GET /admin/contractors
getAllJobs()          // GET /admin/jobs
```

## Next Steps

1. **Add Authentication Context** - Create `AuthContext.jsx` for state management
2. **Implement Protected Routes** - Add `ProtectedRoute.jsx` component
3. **Connect Backend APIs** - Update services with actual API endpoints
4. **Add Error Handling** - Implement error boundaries and toast notifications
5. **Form Validation** - Add form validation libraries (e.g., Formik, React Hook Form)
6. **State Management** - Consider adding Redux or Context API for global state
7. **Responsive Testing** - Test on mobile, tablet, and desktop

## Features Completed

✅ Project scaffolding with Vite  
✅ React Router setup with all routes  
✅ Tailwind CSS integration  
✅ Base components (Navbar, Sidebar, Footer, JobCard)  
✅ All page templates (Home, Login, Register, Dashboards)  
✅ API service layer structure  
✅ Mock data for job listings  

## Development Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm install        # Install new packages
```
