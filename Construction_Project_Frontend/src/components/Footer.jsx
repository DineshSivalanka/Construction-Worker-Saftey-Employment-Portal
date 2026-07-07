import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#2C2E39] text-gray-300 py-8 mt-auto border-t border-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
        <p className="mb-0 text-sm md:text-base font-medium">
          &copy; 2026 Construction Worker Safety & Employment Portal
        </p>
        
        <div>
          <p className="mb-1 text-sm md:text-base">
            Developed with <span className="text-red-500">❤️</span> by
          </p>
          <p className="mb-0 text-lg md:text-xl font-bold text-white">
            Dinesh Sivalanka & Mahesh Veeramallu
          </p>
        </div>

        
      </div>
    </footer>
  );
}

export default Footer;
