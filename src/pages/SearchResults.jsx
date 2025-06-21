import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchResults } from "../api/omdb";
import MovieList from "../components/MovieList";
import ReactPaginate from "react-paginate";

import { MovieContext } from "../context/MovieContext";

export default function SearchResults() {
  const { state, dispatch } = useContext(MovieContext);
  const { currentPage } = state;

  const [searchTerm] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const query = searchTerm.get("s");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING" });
        const data = await getSearchResults(query, currentPage);
        console.log("Search Results:", data);
        setSearchResults(data.results);
        setTotalPages(Math.min(data.total_pages, 100));
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    fetchData();
  }, [query, currentPage, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (selected) => {
    dispatch({ type: "SET_PAGE", payload: selected.selected + 1 });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-14 text-center">
          Search Results for "{query}"
        </h1>
        <MovieList movies={searchResults} />
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex gap-2"}
              pageClassName={
                "page-item border border-green-400 rounded cursor-pointer"
              }
              activeClassName={"bg-green-700 text-white"}
              previousClassName={
                "border border-green-400 rounded cursor-pointer"
              }
              nextClassName={"border border-green-400 rounded cursor-pointer"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
              forcePage={currentPage - 1}
            />
          </div>
        )}
      </div>
    </>
  );
}
