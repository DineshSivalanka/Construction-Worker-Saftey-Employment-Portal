import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">{job.salary}</span>
      </div>
      <p className="mb-2 text-sm text-slate-600">{job.location}</p>
      <p className="mb-4 text-sm text-slate-600">{job.description}</p>
      <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2 py-1">{job.hours}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1">{job.workersNeeded} workers</span>
        <span className="rounded-full bg-slate-100 px-2 py-1">Exp: {job.experience}</span>
      </div>
      <Link to={`/worker/jobs/${job.id}`} className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;
