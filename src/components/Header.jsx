import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { MovieContext } from "../context/MovieContext";

export default function Header() {
  const { dispatch } = useContext(MovieContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?s=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword("");
      dispatch({ type: "SET_PAGE", payload: 1 });
      setIsOpen(false);
    }
  };

  const toggleMobileSearch = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="shadow-sm border-t-8 border-y-green-600">
        <div className="container mx-auto px-4 py-5 md:py-8 flex flex-wrap justify-between items-center">
          <div className="w-[50%]">
            <h1 className="logo_text text-3xl md:text-5xl font-bold text-green-700">
              <Link to="/">MovieSpot</Link>
            </h1>
          </div>
          <div className="flex items-center justify-end md:hidden text-right w-[50%]">
            <button
              onClick={toggleMobileSearch}
              className="cursor-pointer text-2xl text-green-700 px-3 text-3xl"
            >
              <LuSearch />
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full mt-4 md:mt-0 md:block md:w-[50%]`}
          >
            <form
              onSubmit={handleSearch}
              className="flex justify-end gap-2 w-full"
            >
              <input
                type="text"
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="Search movies..."
                className="w-[80%] md:w-auto lg:w-[50%] border border-gray-400 py-3 px-5 outline-0 h-12 rounded"
              />
              <button
                type="submit"
                className="cursor-pointer w-[20%] md:w-auto h-12 flex justify-center items-center text-2xl bg-green-700 hover:bg-green-900 text-white hover:text-white px-3 rounded"
              >
                <LuSearch />
              </button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}
