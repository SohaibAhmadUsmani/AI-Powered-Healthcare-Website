import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LabTests from './pages/LabTests';
import EmergencyContacts from './pages/EmergencyContacts';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation placeholder */}
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-sky-600">MediMind.AI</h1>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-sky-600">Home</Link>
              <Link to="/lab-tests" className="text-gray-600 hover:text-sky-600">Lab Tests</Link>
              <Link to="/emergency" className="text-gray-600 hover:text-sky-600">Emergency</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/emergency" element={<EmergencyContacts />} />
          </Routes>
        </main>

        {/* Footer placeholder */}
        <footer className="bg-slate-800 text-white p-6 text-center">
          <p>&copy; {new Date().getFullYear()} MediMind.AI. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;