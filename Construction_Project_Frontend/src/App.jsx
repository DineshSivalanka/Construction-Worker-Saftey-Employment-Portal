import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Applicants from './pages/Contractor/Applicants';
import ContractorDashboard from './pages/Contractor/ContractorDashboard';
import ContractorProfile from './pages/Contractor/ContractorProfile';
import EditJob from './pages/Contractor/EditJob';
import MyJobs from './pages/Contractor/MyJobs';
import PostJob from './pages/Contractor/PostJob';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AvailableJobs from './pages/Worker/AvailableJobs';
import JobDetails from './pages/Worker/JobDetails';
import MyApplications from './pages/Worker/MyApplications';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import WorkerProfile from './pages/Worker/WorkerProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      <Route path="/worker/profile" element={<WorkerProfile />} />
      <Route path="/worker/jobs" element={<AvailableJobs />} />
      <Route path="/worker/jobs/:id" element={<JobDetails />} />
      <Route path="/worker/applications" element={<MyApplications />} />
      <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
      <Route path="/contractor/profile" element={<ContractorProfile />} />
      <Route path="/contractor/post-job" element={<PostJob />} />
      <Route path="/contractor/jobs" element={<MyJobs />} />
      <Route path="/contractor/applicants" element={<Applicants />} />
      <Route path="/contractor/jobs/:id/edit" element={<EditJob />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
