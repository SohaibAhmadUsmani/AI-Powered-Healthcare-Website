import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
      />

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search doctors by name or specialization..."
        className="glass-panel w-full pl-12 pr-5 py-4 rounded-xl outline-none border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 transition"
      />
    </div>
  );
}

export default SearchBar;