import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 z-10"
      />

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search doctors by name or specialization..."
        className="w-full pl-12 pr-5 py-3.5 rounded-xl outline-none border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-darkBg/60 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 focus:ring-2 focus:ring-lightSecondary/20 dark:focus:ring-darkSecondary/20 transition-all text-sm font-sans"
      />
    </div>
  );
}

export default SearchBar;