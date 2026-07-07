import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getWorkers, deleteUser } from "../../services/adminService";

function AdminWorkers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const response = await getWorkers();
      setWorkers(response.data);
    } catch (error) {
      console.error("Failed to load workers", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this worker account?")) return;
    try {
      await deleteUser(userId);
      alert("Worker deleted successfully");
      loadWorkers();
    } catch (error) {
      console.error("Failed to delete worker", error);
      alert("Failed to delete worker");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold">👷 Manage Workers</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            🔙 Back to Dashboard
          </Link>
        </div>

        {workers.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">No workers registered yet.</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Worker Name</th>
                  <th>Skill</th>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.workerId}>
                    <td className="fw-bold">{worker.workerName || "N/A"}</td>
                    <td><span className="badge bg-warning text-dark">{worker.skill || "N/A"}</span></td>
                    <td>{worker.experienceYears || 0} Years</td>
                    <td>{worker.currentLocation || worker.address || "N/A"}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(worker.user.userId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminWorkers;
