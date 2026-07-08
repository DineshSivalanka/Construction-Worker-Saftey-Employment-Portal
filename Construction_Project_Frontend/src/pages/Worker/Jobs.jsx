import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllJobs, applyJob } from "../../services/jobService";
import { useTranslation } from "react-i18next";
import { useDynamicTranslation } from "../../hooks/useDynamicTranslation";

function Jobs() {
    const { t } = useTranslation();
    const { translate, currentLang, isLoading: isTranslating } = useDynamicTranslation();

    const workerId = localStorage.getItem("userId"); // Loaded dynamically from login

    const [jobs, setJobs] = useState([]);
    const [translatedJobs, setTranslatedJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    useEffect(() => {
        if (jobs.length > 0) {
            translateAllJobs();
        } else {
            setTranslatedJobs([]);
        }
    }, [jobs, currentLang]);

    const translateAllJobs = async () => {
        if (currentLang === 'en') {
            setTranslatedJobs(jobs);
            return;
        }

        const newJobs = await Promise.all(jobs.map(async (job) => {
            const translatedTitle = await translate(job.jobTitle);
            const translatedDesc = await translate(job.description);
            const translatedLocation = await translate(job.location);
            return {
                ...job,
                translatedTitle,
                translatedDesc,
                translatedLocation
            };
        }));
        setTranslatedJobs(newJobs);
    };

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
            alert(t("workerJobs.applyError"));
        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-warning mb-4">
                    {t("workerJobs.title")}
                </h2>

                <div className="row">

                    {
                        isTranslating ? (
                            <div className="col-12 text-center text-muted mt-5">
                                <div className="spinner-border text-[#D8125B] mb-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h5>{t("workerJobs.loadingTranslations")}</h5>
                            </div>
                        ) : translatedJobs.length === 0 ? (
                            <div className="col-12 text-center text-muted mt-5">
                                <h5>{t("workerJobs.noJobs")}</h5>
                            </div>
                        ) : (
                            translatedJobs.map((job) => (

                                <div className="col-md-6 mb-4" key={job.jobId}>

                                    <div className="card shadow border-0 h-100">

                                        <div className="card-body">

                                            <h4 className="text-[#D8125B]">
                                                {job.translatedTitle || job.jobTitle}
                                            </h4>

                                            <hr />

                                            <p>
                                                <strong>{t("workerJobs.contractor")} :</strong>{" "}
                                                {job.contractor ? job.contractor.contractorName : t("workerJobs.unknown")}
                                            </p>

                                            <p>
                                                <strong>{t("workerJobs.location")} :</strong>{" "}
                                                {job.translatedLocation || job.location}
                                            </p>

                                            <p>
                                                <strong>{t("workerJobs.workingHours")} :</strong>{" "}
                                                {job.workingHours}
                                            </p>

                                            <p>
                                                <strong>{t("workerJobs.salary")} :</strong>{" "}
                                                ₹ {job.salary}
                                            </p>

                                            <p>
                                                <strong>{t("workerJobs.description")} :</strong>
                                                <br />
                                                {job.translatedDesc || job.description}
                                            </p>

                                            <button
                                                className="btn btn-success w-100"
                                                onClick={() => apply(job.jobId)}
                                            >
                                                {t("workerJobs.apply")}
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
