import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function ContractorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Contractor Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Link to="/contractor/post-job" className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-600">Post a Job</p>
            <p className="mt-2 text-2xl font-semibold text-[#D8125B]">➕</p>
          </Link>
          <Link to="/contractor/jobs" className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-600">My Jobs</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">8</p>
          </Link>
          <Link to="/contractor/applicants" className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-600">Applicants</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">24</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContractorDashboard;
