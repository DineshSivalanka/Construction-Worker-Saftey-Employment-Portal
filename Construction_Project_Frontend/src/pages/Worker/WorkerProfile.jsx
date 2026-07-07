import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function WorkerProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-semibold text-slate-900">Your Profile</h1>
          <form className="space-y-4">
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Full Name" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Mobile" />
            <textarea className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Skills & Experience" rows="4"></textarea>
            <button type="submit" className="w-full rounded-lg bg-[#D8125B] px-4 py-3 font-semibold text-gray-900 hover:bg-[#D8125B]">Save Profile</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default WorkerProfile;
