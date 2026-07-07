import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Register() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">Register</h1>
          <p className="mb-6 text-slate-600">Choose your role and create your account.</p>
          <div className="mb-6 flex flex-wrap gap-4">
            <button className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white">Worker</button>
            <button className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700">Contractor</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Full Name" />
            <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Mobile Number" />
            <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Email" />
            <input className="rounded-lg border border-slate-300 px-4 py-3" placeholder="Password" />
          </div>
          <button className="mt-6 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">Register</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
