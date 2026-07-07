import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function ContractorDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container mt-5">
        <h2>Contractor Dashboard</h2>
      </main>
      <Footer />
    </div>
  );
}

export default ContractorDashboard;
