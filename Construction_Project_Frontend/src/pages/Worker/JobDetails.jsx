import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function JobDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">House Construction</h1>
          <p className="mb-6 text-slate-600">Job ID: {id}</p>
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-slate-600">Location</p>
              <p className="text-lg font-semibold text-slate-900">New York, NY</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-slate-600">Salary</p>
              <p className="text-lg font-semibold text-[#D8125B]">₹900/day</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-slate-600">Hours</p>
              <p className="text-lg font-semibold text-slate-900">9 AM - 6 PM</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-slate-600">Workers Needed</p>
              <p className="text-lg font-semibold text-slate-900">5</p>
            </div>
          </div>
          <p className="mb-6 text-slate-700">Help with residential building construction. This is a great opportunity to work with experienced contractors.</p>
          <button className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-gray-900 hover:bg-green-700">Apply Now</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default JobDetails;
