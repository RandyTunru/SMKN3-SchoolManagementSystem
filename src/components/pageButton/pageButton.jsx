import React from "react";

function PageButton({ currentPage, totalPages, onPageChange }) {

  //Function to handle decrease button
  const handleDecrease = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  //Function to handle increase button
  const handleIncrease = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  //Function to handle page change (when clicking the page number button)
  const handlePageChange = (number) => {
    onPageChange(number);
  };

  const arrInit = (_, index) => {
    if (currentPage === 1) {
      return index + 1;
    } else if (currentPage === totalPages) {
      return currentPage - 2 + index;
    } else {
      return currentPage - 1 + index;
    }
  };

  return (
    <div className="flex flex-row gap-[20px] justify-center mb-8">
      <button onClick={handleDecrease} className="flex justify-center items-center w-[3vw] h-[3vw] border-2 border-orange-600 bg-white text-blue-dark px-4 py-2 rounded-full hover:bg-[#e0eaf1]">{"<"}</button>
      {Array.from({ length: 3 }, arrInit).map((number) => number > 0 && number <= totalPages ?  (
        <button onClick={() => handlePageChange(number)} key={number} className={`flex justify-center items-center w-[3vw] h-[3vw] border-2 border-orange-600 px-4 py-2 rounded-full  ${number === currentPage ? 'bg-orange-600 text-white' : 'bg-white text-blue-dark hover:bg-[#e0eaf1]'}`}>
          {number}
        </button>
        ) : null
      )} 
      <button onClick={handleIncrease} className="flex justify-center items-center w-[3vw] h-[3vw] border-2 border-orange-600 bg-white text-blue-dark px-4 py-2 rounded-full hover:bg-[#e0eaf1]">{">"}</button>
    </div>
  );
}

export default PageButton;