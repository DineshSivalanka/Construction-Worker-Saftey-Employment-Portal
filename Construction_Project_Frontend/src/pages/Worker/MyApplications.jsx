import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function MyApplications() {
  const applications = [
    { id: 1, jobTitle: 'House Construction', status: 'Pending' },
    { id: 2, jobTitle: 'Road Repair', status: 'Accepted' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">My Applications</h1>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{app.jobTitle}</h3>
                <p className="text-sm text-slate-600">Status: {app.status}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${app.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{app.status}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyApplications;
