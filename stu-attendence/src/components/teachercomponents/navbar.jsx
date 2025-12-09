import { Search, User, Menu } from "lucide-react";

export default function Navbar({ toggle }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 transition-all duration-300">

      {/* NAVBAR */}
      <nav className="flex p-5 gap-4 justify-between items-center bg-white shadow relative z-20">
        
        {/* LEFT - MENU BUTTON */}
        <button onClick={toggle} className="p-2">
          <Menu />
        </button>

        {/* RIGHT - USER ICON */}
        <div className="user flex mr-8 w-10 h-10">
          <User />
        </div>
      </nav>

      {/* FLOATING SEARCH BAR */}
      <div
        className="fixed top-4 z-30 px-4 pointer-events-none
        sm:right-4 sm:left-auto
        md:left-1/2 md:right-auto md:-translate-x-1/2
      "
      >
        <div
          className="flex items-center gap-2 w-[90vw] sm:w-[60vw] md:w-[45vw]
            py-2 px-4 pointer-events-auto 
            rounded-full shadow-md bg-white border border-gray-200
          "
        >
          <input
            type="text"
            placeholder="Search students, classes, attendance ..."
            className="bg-transparent text-gray-700 placeholder-gray-400 w-full p-2 outline-none"
          />
          <button className="p-2">
            <Search className="text-gray-600" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
