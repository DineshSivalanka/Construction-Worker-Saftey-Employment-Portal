import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Login() {
  const [mobile, setMobile] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">Login</h1>
          <p className="mb-6 text-slate-600">Enter your mobile number to receive OTP.</p>
          <label className="mb-2 block text-sm font-medium text-slate-700">Mobile Number</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-orange-500" placeholder="9876543210" />
          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">Send OTP</button>
          <p className="mt-4 text-sm text-slate-600">New here? <Link to="/register" className="font-semibold text-orange-600">Create account</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
