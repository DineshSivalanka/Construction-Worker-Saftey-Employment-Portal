import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Construction Worker Portal. All rights reserved.
        </p>
        <small className="text-muted">Building better teams together.</small>
      </div>
    </footer>
  );
}

export default Footer;
