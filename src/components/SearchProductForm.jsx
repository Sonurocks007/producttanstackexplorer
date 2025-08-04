import React, { useState } from "react";

const SearchProductForm = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    onSearch(result);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4 justify-center">
      <input
        type="text"
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchProductForm;
