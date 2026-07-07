import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function MyJobs() {
  const jobs = [
    { id: 1, title: 'House Construction', location: 'New York, NY', applicants: 12, status: 'Active' },
    { id: 2, title: 'Road Repair', location: 'Los Angeles, CA', applicants: 8, status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">My Jobs</h1>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{job.title}</h3>
                <p className="text-sm text-slate-600">{job.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{job.applicants} applicants</p>
                <p className="text-xs text-green-600">{job.status}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyJobs;
