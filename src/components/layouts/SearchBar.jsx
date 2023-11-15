import { useState, useEffect } from "react";
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchText}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
    if(event.key === "Escape"){
      setSearchText("");
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <input
        type="text"
        className="w-2/3 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-4 py-1"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      >
      </input>
      
    </div>
  );
};
export default SearchBar;
