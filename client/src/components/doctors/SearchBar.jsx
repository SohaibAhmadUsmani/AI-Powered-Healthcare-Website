function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-2xl">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search doctors by name or specialization..."
        className="glass-panel w-full px-5 py-4 rounded-xl outline-none border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 transition"
      />
    </div>
  );
}

export default SearchBar;