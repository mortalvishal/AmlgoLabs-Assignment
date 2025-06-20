import React from "react";
import CARD_2 from "../assets/images/card2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">
          Personal Finance Tracker+
        </h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="" />
        <div className="" />
        <div className="" />

        {/* <div className='grid grid-cols-1 z-20'>
        <StatsInfoCard 
        icon ={<LuTrendingupDown />}
        label = "Track Your Finance & Expense"
        value = "43,000"
        color = "bg-primary"
        />
        </div> */}
        <img
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
          src={CARD_2}
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthLayout;

// const StatsInfoCard = ({icon, label, value, color} ) => {
//     return  <div>
//         <div className=''>

//         </div>
//     </div>
// }
