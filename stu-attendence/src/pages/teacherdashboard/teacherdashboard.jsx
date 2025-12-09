import Sidebar from "../../components/teachercomponents/sidebar";
import Navbar from "../../components/teachercomponents/navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Teacherdashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // put in parent component so that al child componnents can get it 

  return (
    <div className="flex">

      {/* SIDEBAR */}
      {/* send the isOpen prop to the Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} /> 


      {/* CONTENT AREA */}
      <div
        className={`flex flex-col w-full transition-all duration-300 
        ${isOpen ? "ml-64" : "ml-0"}`}
      >

        {/* navabr same toggle function as side bar  */}
        {/* menu button in navbar toggles the sidebar */}
        <Navbar toggle={() => setIsOpen(!isOpen)} />
        <Outlet />
      </div>

    </div>
  );
};

export default Teacherdashboard;
