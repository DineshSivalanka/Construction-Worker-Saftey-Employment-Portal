import Footer from '../../components/Footer';
import JobCard from '../../components/JobCard';
import Navbar from '../../components/Navbar';

const mockJobs = [
  { id: 1, title: 'House Construction', location: 'New York, NY', salary: '₹900/day', description: 'Help with residential building construction', hours: '9 AM - 6 PM', workersNeeded: 5, experience: '2 Years' },
  { id: 2, title: 'Road Repair', location: 'Los Angeles, CA', salary: '₹750/day', description: 'Assist with road maintenance and repair', hours: '8 AM - 5 PM', workersNeeded: 3, experience: '1 Year' },
];

function AvailableJobs() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Available Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AvailableJobs;
