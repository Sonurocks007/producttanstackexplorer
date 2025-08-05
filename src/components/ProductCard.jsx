import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";
import Pagination from "../components/pagination/Pagination";
import { Button } from "./index";

const ProductCard = () => {
  const { data, isLoading, error } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (data) {
      const filtered = searchQuery.trim()
        ? data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;

      setFilteredData(filtered);
      setCurrentPage(1);
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
  console.log(data);
  

  return (
    <div className="bg-gray-200 min-h-screen opacity-95 relative font-sans w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  gap-4 mt-2 mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center sm:text-left ml-5">
          Products Cart
        </h1>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 w-full sm:w-auto mr-5">
          {showSearchBar ? (
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              <Button
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchQuery("");
                }}
                Icon={<FaTimes size={14} />}
                className="bg-red-600 hover:bg-red-500 flex items-center justify-center text-white"
              />
            </div>
          ) : (
            <Button
              onClick={() => setShowSearchBar(true)}
              Icon={<FaSearch size={14} />}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white "
            />
          )}
          <Button
            onClick={() => setShowAddForm(true)}
            title="Add Product"
            Icon={<FaPlus size={14} />}
            className="bg-green-600 hover:bg-green-500 flex items-center justify-center text-white"
          />
        </div>
      </div>

      {(showAddForm || showUpdateForm) && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900/40 z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowAddForm(false);
                setShowUpdateForm(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <FaTimes size={18} />
            </button>

            {showAddForm && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-green-600">
                  Add Product
                </h2>
                <AddProductForm />
              </>
            )}

            {showUpdateForm && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-yellow-600">
                  Update Product
                </h2>
                <UpdateProductForm />
              </>
            )}
          </div>
        </div>
      )}

      <div className="   grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-5">
        {paginatedData.length > 0 ? (
          paginatedData.map((product) => (
            <div
              key={product.id}
              className="bg-white w-full h-[410px] rounded-xl cursor-pointer shadow-md hover:shadow-xl opacity-90 transition duration-300 relative group"
            >
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 hover:bg-red-500 text-white rounded-full p-2"
                >
                  <FaTrash size={14} />
                </button>
                <button
                  onClick={() => setShowUpdateForm(true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-full p-2"
                >
                  <FaEdit size={14} />
                </button>
              </div>

              <div className="aspect-video  flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className=" size-70 object-contain shadow-gray-300 backdrop:blur-sm rounded-2xl mt-1 mb-1"
                />
              </div>

              <div className="w-full  rounded-3xl mt-1 mb-6 p-2">
                <h2 className="font-bold  text-md mb-1 line-clamp-2 text-gray-800">
                  {product.title}
                </h2>
                <p className="font-semibold text-sm text-gray-400 capitalize">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  US${product.price}
                </p>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductCard;
