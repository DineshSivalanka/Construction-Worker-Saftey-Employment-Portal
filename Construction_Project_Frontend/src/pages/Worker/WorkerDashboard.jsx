import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function WorkerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row">
        <Sidebar />
        <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-2xl font-semibold text-slate-900">Worker Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-sm text-slate-600">Nearby Jobs</p>
              <p className="mt-2 text-2xl font-semibold text-orange-700">12</p>
            </div>
            <div className="rounded-xl bg-[#D8125B] p-4">
              <p className="text-sm text-slate-600">Applications</p>
              <p className="mt-2 text-2xl font-semibold text-[#D8125B]">4</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-slate-600">Accepted</p>
              <p className="mt-2 text-2xl font-semibold text-green-700">2</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default WorkerDashboard;
