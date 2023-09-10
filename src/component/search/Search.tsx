import React, { useState } from "react";
import "./search.scss";
import {CiSearch} from 'react-icons/ci'
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
   // onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-between space-x-2  border-solid border-[1px] border-gray-300 rounded-lg overflow-hidden">
    <input
      type="text"
      className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>
  );
};
export default Search;
