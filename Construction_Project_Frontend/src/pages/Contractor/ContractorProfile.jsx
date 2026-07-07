import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function ContractorProfile() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-semibold text-slate-900">Your Profile</h1>
          <form className="space-y-4">
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Company Name" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Contact Number" />
            <textarea className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Company Description" rows="4"></textarea>
            <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">Save Profile</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContractorProfile;
