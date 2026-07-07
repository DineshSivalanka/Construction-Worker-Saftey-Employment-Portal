import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>✏️ Edit Job #{jobId}</h2>
        <div className="alert alert-info mt-3">
          Edit Job feature is coming soon! The UI is ready for Step 6.
        </div>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/contractor/my-jobs")}>
          🔙 Back to My Jobs
        </button>
      </div>
    </>
  );
}

export default EditJob;
