import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserContext } from "../context/UserContext";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSIdeMenu] = useState(false);
  const { user } = useContext(UserContext);
  
  return (
    <div className=" flex justify-between items-center bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button className=" block lg:hidden text-black" onClick={() => setOpenSIdeMenu(!openSideMenu)}>
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black">Personal Finance Tracker+</h2>
      </div>
      
      {/* User Profile Section */}
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Welcome, {user.fullName}
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {user.fullName?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      )}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
