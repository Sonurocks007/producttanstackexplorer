import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";

const ProductCard = () => {
  const { data, isLoading, error } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter on search
  useEffect(() => {
    if (data) {
      const filtered = searchQuery.trim()
        ? data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;

      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page when search changes
    }
  }, [searchQuery, data]);

  if (isLoading)
    return (
      <p className="text-center mt-10 text-xl text-blue-500">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-xl text-red-500">
        Error: {error.message}
      </p>
    );

  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Products
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200"
        >
          <FaPlus /> Add Product
        </button>

        <button
          onClick={() => setShowUpdateForm(true)}
          className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded hover:bg-yellow-200"
        >
          <FaEdit /> Update Product
        </button>

        <button
          onClick={() => setShowSearchBar(true)}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
        >
          <FaSearch /> Search
        </button>
      </div>

      {(showAddForm || showUpdateForm || showSearchBar) && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-30 flex justify-center items-start pt-20 z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowAddForm(false);
                setShowUpdateForm(false);
                setShowSearchBar(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <FaTimes size={18} />
            </button>

            {showAddForm && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-green-700">
                  Add Product
                </h2>
                <AddProductForm />
              </>
            )}

            {showUpdateForm && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-yellow-700">
                  Update Product
                </h2>
                <UpdateProductForm />
              </>
            )}

            {showSearchBar && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-blue-700">
                  Search Product
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded-md"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-md mb-3"
              />
              <h2 className="font-semibold text-md mb-1 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {product.category}
              </p>
              <p className="text-lg font-bold text-green-600 mt-1">
                US${product.price}
              </p>

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-red-500 text-lg mt-6">
            No products found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((pageNum) => (
            <button
              key={pageNum + 1}
              onClick={() => setCurrentPage(pageNum + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === pageNum + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
