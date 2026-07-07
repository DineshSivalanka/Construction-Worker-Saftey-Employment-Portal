import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import WorkerDashboard from '../pages/worker/Dashboard';
import ContractorDashboard from '../pages/contractor/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminWorkers from '../pages/admin/Workers';
import AdminContractors from '../pages/admin/Contractors';
import AdminJobs from '../pages/admin/Jobs';

import Profile from '../pages/worker/Profile';
import Jobs from '../pages/worker/Jobs';
import MyApplications from '../pages/worker/MyApplications';

import PostJob from '../pages/contractor/PostJob';
import MyJobs from '../pages/contractor/MyJobs';
import EditJob from '../pages/contractor/EditJob';
import Applicants from '../pages/contractor/Applicants';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      <Route path="/worker/profile" element={<Profile />} />
      <Route path="/worker/jobs" element={<Jobs />} />
      <Route path="/worker/my-applications" element={<MyApplications />} />

      <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
      <Route path="/contractor/post-job" element={<PostJob />} />
      <Route path="/contractor/my-jobs" element={<MyJobs />} />
      <Route path="/contractor/edit-job/:jobId" element={<EditJob />} />
      <Route path="/contractor/applicants/:jobId" element={<Applicants />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/workers" element={<AdminWorkers />} />
      <Route path="/admin/contractors" element={<AdminContractors />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
    </Routes>
  );
}

export default AppRoutes;
