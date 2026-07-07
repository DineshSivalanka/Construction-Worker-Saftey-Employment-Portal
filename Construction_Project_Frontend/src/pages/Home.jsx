import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const features = [
  'Find nearby construction jobs quickly',
  'Connect with verified contractors',
  'Track applications from one dashboard',
];

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="bg-orange-50 px-6 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Construction Worker Portal</p>
              <h1 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">Find work, hire faster, and build better teams.</h1>
              <p className="mb-8 max-w-xl text-lg text-slate-600">A simple platform for workers, contractors, and admins to connect seamlessly in the construction ecosystem.</p>
              <div className="flex flex-wrap gap-4">
                <a href="/register" className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">Get Started</a>
                <a href="/login" className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">Login</a>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-4 text-2xl font-semibold text-slate-800">Why this platform works</h2>
              <ul className="space-y-3 text-slate-600">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3"><span className="text-orange-600">✔</span>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
