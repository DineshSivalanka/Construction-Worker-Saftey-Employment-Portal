import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getContractors, deleteUser } from "../../services/adminService";

function AdminContractors() {
  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = async () => {
    try {
      const response = await getContractors();
      setContractors(response.data);
    } catch (error) {
      console.error("Failed to load contractors", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this contractor account?")) return;
    try {
      await deleteUser(userId);
      alert("Contractor deleted successfully");
      loadContractors();
    } catch (error) {
      console.error("Failed to delete contractor", error);
      alert("Failed to delete contractor");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning fw-bold">🏗️ Manage Contractors</h2>
          <Link to="/admin/dashboard" className="btn btn-secondary fw-bold">
            🔙 Back to Dashboard
          </Link>
        </div>

        {contractors.length === 0 ? (
          <div className="alert alert-info text-center rounded-4 shadow-sm py-4">
            <h4 className="mb-0">No contractors registered yet.</h4>
          </div>
        ) : (
          <div className="table-responsive shadow rounded-4">
            <table className="table table-hover table-striped mb-0 text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Contractor Name</th>
                  <th>Completed Projects</th>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contractors.map((contractor) => (
                  <tr key={contractor.contractorId}>
                    <td className="fw-bold">{contractor.contractorName || "N/A"}</td>
                    <td><span className="badge bg-success">{contractor.completedProjects || 0}</span></td>
                    <td>{contractor.experienceYears || 0} Years</td>
                    <td>{contractor.district || contractor.address || "N/A"}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => handleDelete(contractor.user.userId)}
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

export default AdminContractors;
