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
