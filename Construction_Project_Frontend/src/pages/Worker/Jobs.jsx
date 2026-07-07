import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllJobs, applyJob } from "../../services/jobService";

function Jobs() {

    const workerId = localStorage.getItem("userId"); // Loaded dynamically from login

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const apply = async (jobId) => {

        try {

            const response = await applyJob(jobId, workerId);

            alert(response.data);

        } catch (error) {

            alert("Unable to Apply");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-warning mb-4">
                    Available Jobs
                </h2>

                <div className="row">

                    {
                        jobs.length === 0 ? (
                            <div className="col-12 text-center text-muted mt-5">
                                <h5>No jobs available at the moment.</h5>
                            </div>
                        ) : (
                            jobs.map((job) => (

                                <div className="col-md-6 mb-4" key={job.jobId}>

                                    <div className="card shadow border-0 h-100">

                                        <div className="card-body">

                                            <h4 className="text-[#D8125B]">
                                                {job.jobTitle}
                                            </h4>

                                            <hr />

                                            <p>
                                                <strong>Contractor :</strong>{" "}
                                                {job.contractor ? job.contractor.contractorName : "Unknown"}
                                            </p>

                                            <p>
                                                <strong>Location :</strong>{" "}
                                                {job.location}
                                            </p>

                                            <p>
                                                <strong>Working Hours :</strong>{" "}
                                                {job.workingHours}
                                            </p>

                                            <p>
                                                <strong>Salary :</strong>{" "}
                                                ₹ {job.salary}
                                            </p>

                                            <p>
                                                <strong>Description :</strong>
                                                <br />
                                                {job.description}
                                            </p>

                                            <button
                                                className="btn btn-success w-100"
                                                onClick={() => apply(job.jobId)}
                                            >
                                                Apply Job
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))
                        )
                    }

                </div>

            </div>
        </>
    );
}

export default Jobs;
