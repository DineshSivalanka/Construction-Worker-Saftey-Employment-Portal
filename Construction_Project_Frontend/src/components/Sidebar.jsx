import { Link } from 'react-router-dom';

const links = [
  { to: '/worker/dashboard', label: 'Dashboard' },
  { to: '/worker/jobs', label: 'Available Jobs' },
  { to: '/worker/applications', label: 'My Applications' },
  { to: '/worker/profile', label: 'Profile' },
];

function Sidebar() {
  return (
    <aside className="w-full rounded-2xl bg-white p-4 shadow-sm md:w-64">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Worker Menu</h2>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-[#D8125B]">
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
