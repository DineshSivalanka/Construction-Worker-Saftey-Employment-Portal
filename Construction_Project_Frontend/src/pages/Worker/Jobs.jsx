import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllJobs, applyJob } from "../../services/jobService";

function Jobs() {

    const workerId = 1; // Temporary (later from login)

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
                        jobs.map((job) => (

                            <div className="col-md-6 mb-4" key={job.id}>

                                <div className="card shadow border-0 h-100">

                                    <div className="card-body">

                                        <h4 className="text-primary">
                                            {job.jobTitle}
                                        </h4>

                                        <hr />

                                        <p>
                                            <strong>Contractor :</strong>{" "}
                                            {job.contractorName}
                                        </p>

                                        <p>
                                            <strong>Location :</strong>{" "}
                                            {job.jobLocation}
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
                                            onClick={() => apply(job.id)}
                                        >
                                            Apply Job
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default Jobs;
