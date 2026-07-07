import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function Applicants() {
  const applicants = [
    { id: 1, name: 'John Doe', experience: '3 Years', skills: 'Carpentry, Masonry' },
    { id: 2, name: 'Jane Smith', experience: '5 Years', skills: 'Steel Work, Welding' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Applicants</h1>
        <div className="space-y-4">
          {applicants.map((app) => (
            <div key={app.id} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{app.name}</h3>
                <p className="text-sm text-slate-600">{app.experience} • {app.skills}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Accept</button>
                <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Applicants;
