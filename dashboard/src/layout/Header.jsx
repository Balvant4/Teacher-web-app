import { FaList } from "react-icons/fa";
import SearchBar from "../components/SearchBar.jsx";
import { useState } from "react";

function Header({ showSidebar, setShowSidebar }) {
  const [searchValue, setSearchValue] = useState("");

  const handleNavigationSearch = (query) => {
    console.log("Header Search:", query);
    // Add navigation-specific search logic here
  };

  return (
    <div className=" fixed top-0 left-0 w-full py-5 px-4 lg:px-7 z-40">
      <div className=" ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-hdnavbg px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className=" w-[35px] flex lg:hidden cursor-pointer p-2 rounded bg-indigo-500  hover:bg-indigo-600"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className=" hidden md:block">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleNavigationSearch}
            placeholder="Search navigation..."
          />
        </div>
        <div className=" flex justify-center items-center gap-8 relative">
          <div className=" flex justify-center items-center">
            <div className=" flex justify-center items-center gap-3">
              <div className=" flex justify-center items-center flex-col text-end">
                <h2 className=" text-md font-bold">Balvant</h2>
                <span className=" w-full font-normal text=[14px]">Admin</span>
              </div>
              <img
                src="http://localhost:5173/images/admin.jpg"
                alt="Profile"
                className=" w-[45px] h-[45px] rounded-full overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
