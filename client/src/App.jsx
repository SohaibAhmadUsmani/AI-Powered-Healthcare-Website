import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation placeholder */}
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-sky-600">MediMind.AI</h1>
            <nav className="space-x-4">
              <span className="text-gray-600 cursor-pointer">Home</span>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-slate-800 text-white p-6 text-center">
          <p>&copy; {new Date().getFullYear()} MediMind.AI. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;