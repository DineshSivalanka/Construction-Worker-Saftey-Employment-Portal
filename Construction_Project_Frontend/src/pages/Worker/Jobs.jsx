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

            <div className="container mt-5 mb-5">

                <h2 className="text-[#0D9488] fw-bold mb-4">
                    {t("workerJobs.title")}
                </h2>

                <div className="row justify-content-start">

                    {
                        isTranslating ? (
                            <div className="col-12 text-center text-muted mt-5">
                                <div className="spinner-border text-[#0D9488] mb-2" role="status">
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

                                <div className="col-md-6 col-lg-4 mb-4" key={job.jobId}>

                                    <div className="bg-[#EAF8F7] rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#0D9488]/20 d-flex flex-col justify-between h-100 position-relative" style={{ borderTop: '6px solid #0D9488', maxWidth: '430px' }}>

                                        <div>
                                            {/* Header: Title */}
                                            <div className="mb-3">
                                                <h4 className="fw-bold text-[#0D9488] mb-1 text-truncate" title={job.translatedTitle || job.jobTitle} style={{ fontSize: '1.1rem' }}>
                                                    💼 {job.translatedTitle || job.jobTitle}
                                                </h4>
                                                <small className="text-gray-500 font-semibold" style={{ fontSize: '0.85rem' }}>
                                                    🏢 {job.contractor ? job.contractor.contractorName : t("workerJobs.unknown")}
                                                </small>
                                            </div>

                                            {/* Job Details Card Section */}
                                            <div className="mb-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerJobs.location")}</span>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5 text-truncate" title={job.translatedLocation || job.location}>
                                                            📍 {job.translatedLocation || job.location}
                                                        </p>
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerJobs.workingHours")}</span>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">
                                                            ⏱️ {job.workingHours} Hrs
                                                        </p>
                                                    </div>
                                                    <div className="col-12 mt-1.5">
                                                        <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerJobs.salary")}</span>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">
                                                            💰 ₹{job.salary}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description Section */}
                                            <div className="mb-4">
                                                <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '0.65rem' }}>{t("workerJobs.description")}</span>
                                                <p className="text-sm text-gray-600 mt-0.5 leading-relaxed" style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }} title={job.translatedDesc || job.description}>
                                                    {job.translatedDesc || job.description}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-sm w-100 text-white rounded-xl py-2.5 font-bold transition-all border-0 hover:bg-[#0f766e]"
                                            style={{ backgroundColor: '#0D9488' }}
                                            onClick={() => apply(job.jobId)}
                                        >
                                            {t("workerJobs.apply")}
                                        </button>

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
