function SearchBar({searchTerm ,setSearchTerm}){
    return(
        <div>
            <input type="search " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name or specialization..." />
        </div>
    );

}

export default SearchBar