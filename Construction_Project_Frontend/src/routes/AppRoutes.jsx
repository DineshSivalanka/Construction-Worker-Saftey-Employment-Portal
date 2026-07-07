import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import WorkerDashboard from '../pages/worker/Dashboard';
import ContractorDashboard from '../pages/contractor/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';

import Profile from '../pages/worker/Profile';
import Jobs from '../pages/worker/Jobs';
import Applications from '../pages/worker/Applications';

import PostJob from '../pages/contractor/PostJob';
import MyJobs from '../pages/contractor/MyJobs';
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
      <Route path="/worker/applications" element={<Applications />} />

      <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
      <Route path="/contractor/post-job" element={<PostJob />} />
      <Route path="/contractor/my-jobs" element={<MyJobs />} />
      <Route path="/contractor/applicants/:jobId" element={<Applicants />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
