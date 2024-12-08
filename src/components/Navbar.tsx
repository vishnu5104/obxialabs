import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        to="/features"
      >
        Features
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        to="/studio"
      >
        Studio
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        to="/about"
      >
        About
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        to="/contact"
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
