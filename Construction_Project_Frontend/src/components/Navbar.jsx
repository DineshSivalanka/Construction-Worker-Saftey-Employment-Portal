import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-orange-600 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold">Construction Worker Portal</Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-orange-100">Home</Link>
          <Link to="/login" className="hover:text-orange-100">Login</Link>
          <Link to="/register" className="hover:text-orange-100">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
