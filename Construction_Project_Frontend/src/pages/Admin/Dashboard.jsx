import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getWorkers, getContractors, getJobs } from "../../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    workers: 0,
    contractors: 0,
    jobs: 0,
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Fetch all to get lengths for summary cards
      const [workersRes, contractorsRes, jobsRes] = await Promise.all([
        getWorkers(),
        getContractors(),
        getJobs()
      ]);

      setStats({
        workers: workersRes.data.length,
        contractors: contractorsRes.data.length,
        jobs: jobsRes.data.length,
      });
    } catch (error) {
      console.error("Failed to load admin stats", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-[#D8125B] fw-bold mb-4">👑 Admin Dashboard</h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 rounded-4 text-center">
              <div className="card-body">
                <h1 className="display-4">👷</h1>
                <h3 className="fw-bold">{stats.workers}</h3>
                <h5 className="text-muted">Total Workers</h5>
                <Link to="/admin/workers" className="btn btn-primary mt-3 w-100">
                  Manage Workers
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 rounded-4 text-center">
              <div className="card-body">
                <h1 className="display-4">🏗️</h1>
                <h3 className="fw-bold">{stats.contractors}</h3>
                <h5 className="text-muted">Total Contractors</h5>
                <Link to="/admin/contractors" className="btn btn-warning text-dark fw-bold mt-3 w-100">
                  Manage Contractors
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 rounded-4 text-center">
              <div className="card-body">
                <h1 className="display-4">📋</h1>
                <h3 className="fw-bold">{stats.jobs}</h3>
                <h5 className="text-muted">Total Jobs</h5>
                <Link to="/admin/jobs" className="btn btn-success mt-3 w-100">
                  Manage Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
