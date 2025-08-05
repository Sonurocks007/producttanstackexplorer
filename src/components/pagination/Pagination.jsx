
import React from "react";
import {Button} from "../index"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center mt-8 gap-2">
      <Button
        title="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      />

      {pages.map((num) => (
        <Button
          key={num}
          title={num}
          onClick={() => onPageChange(num)}
          className={`${
            currentPage === num
              ? "bg-blue-500  font-bold text-white"
              : "bg-gray-400 hover:bg-gray-400"
          }`}
        />
      ))}

      <Button
        title="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-300 font-bold hover:bg-gray-400 disabled:opacity-50"
      />
    </div>
  );
};

export default Pagination;
