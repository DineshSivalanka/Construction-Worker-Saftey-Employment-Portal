import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Total Workers</p>
            <p className="mt-2 text-3xl font-semibold text-[#D8125B]">256</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Total Contractors</p>
            <p className="mt-2 text-3xl font-semibold text-[#D8125B]">48</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Active Jobs</p>
            <p className="mt-2 text-3xl font-semibold text-green-600">132</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Total Applications</p>
            <p className="mt-2 text-3xl font-semibold text-purple-600">512</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
