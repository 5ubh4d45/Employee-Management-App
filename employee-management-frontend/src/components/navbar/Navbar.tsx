import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigateTo = useNavigate();
  return (
    <div className="bg-gray-800">
      <div className="h-16 flex items-center">
        <a href="/" className="text-white px-8 text-lg hover:text-slate-100">Employee Management System</a>
        <div className="flex-grow"></div>
            <button className='text-white px-7 py-2 text-lg rounded-full bg-gray-700 hover:bg-gray-800 transition-colors'
            onClick={() => navigateTo('/searchEmployee')}>
              🔍Search Employee</button>
      </div>
    </div>
  );
}

export default Navbar;
