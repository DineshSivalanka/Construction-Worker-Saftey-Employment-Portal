import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function PostJob() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-semibold text-slate-900">Post a New Job</h1>
          <form className="space-y-4">
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Job Title" />
            <textarea className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Job Description" rows="4"></textarea>
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Location" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Salary (per day)" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Working Hours" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Workers Required" type="number" />
            <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="Experience Required" />
            <button type="submit" className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700">Post Job</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PostJob;
