import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import WorkerDashboard from '../pages/Worker/Dashboard';
import ContractorDashboard from '../pages/Contractor/Dashboard';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminWorkers from '../pages/Admin/Workers';
import AdminContractors from '../pages/Admin/Contractors';
import AdminJobs from '../pages/Admin/Jobs';

import Profile from '../pages/Worker/Profile';
import Jobs from '../pages/Worker/Jobs';
import MyApplications from '../pages/Worker/MyApplications';

import PostJob from '../pages/Contractor/PostJob';
import MyJobs from '../pages/Contractor/MyJobs';
import EditJob from '../pages/Contractor/EditJob';
import Applicants from '../pages/Contractor/Applicants';

import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Worker Routes */}
      <Route path="/worker/dashboard" element={<ProtectedRoute allowedRoles={["WORKER"]}><WorkerDashboard /></ProtectedRoute>} />
      <Route path="/worker/profile" element={<ProtectedRoute allowedRoles={["WORKER"]}><Profile /></ProtectedRoute>} />
      <Route path="/worker/jobs" element={<ProtectedRoute allowedRoles={["WORKER"]}><Jobs /></ProtectedRoute>} />
      <Route path="/worker/my-applications" element={<ProtectedRoute allowedRoles={["WORKER"]}><MyApplications /></ProtectedRoute>} />

      {/* Contractor Routes */}
      <Route path="/contractor/dashboard" element={<ProtectedRoute allowedRoles={["CONTRACTOR"]}><ContractorDashboard /></ProtectedRoute>} />
      <Route path="/contractor/post-job" element={<ProtectedRoute allowedRoles={["CONTRACTOR"]}><PostJob /></ProtectedRoute>} />
      <Route path="/contractor/my-jobs" element={<ProtectedRoute allowedRoles={["CONTRACTOR"]}><MyJobs /></ProtectedRoute>} />
      <Route path="/contractor/edit-job/:jobId" element={<ProtectedRoute allowedRoles={["CONTRACTOR"]}><EditJob /></ProtectedRoute>} />
      <Route path="/contractor/applicants/:jobId" element={<ProtectedRoute allowedRoles={["CONTRACTOR"]}><Applicants /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/workers" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminWorkers /></ProtectedRoute>} />
      <Route path="/admin/contractors" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminContractors /></ProtectedRoute>} />
      <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminJobs /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;
