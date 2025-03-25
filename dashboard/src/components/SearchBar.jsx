function SearchBar({
  searchValue,
  setSearchValue,
  handleSearch,
  placeholder = "Search",
  className,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (handleSearch) {
      handleSearch(value);
    }
  };

  return (
    <input
      onChange={handleChange}
      className={`px-4 py-2  border border-gray-700 hover:border-[#ff7700] rounded-md text-[#ded2d6] hover:bg-gray-800 shadow-md transition-all duration-200 focus:outline-none ${className}`}
      type="text"
      placeholder={placeholder}
      value={searchValue}
    />
  );
}

export default SearchBar;
