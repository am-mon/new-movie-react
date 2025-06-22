import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import ReactPaginate from "react-paginate";
import { getGenres, getMoviesByGenre } from "../api/omdb";
import MovieList from "./MovieList";
import Loader from "./Loader";
import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // Heroicons

export default function GenreTabs() {
  const { state, dispatch } = useContext(MovieContext);
  const { genre, movies, loading, currentPage, error } = state;
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [showTabs, setShowTabs] = useState(false);

  const tabsRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
      // console.log(data);
      if (data.length > 0) {
        dispatch({
          type: "SET_GENRE",
          payload: genre?.id ? genre : data[0],
        });
      }
    };
    fetchGenres();
  }, [dispatch]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch({ type: "SET_LOADING" });
        const data = await getMoviesByGenre(genre.id, currentPage);
        // console.log(genre.id);
        console.log(data);
        dispatch({ type: "SET_MOVIES", payload: data.results });
        setTotalPages(Math.min(data.total_pages, 100));
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };
    if (genre?.id) {
      fetchMovies();
    }
  }, [genre, currentPage, dispatch]);

  const selectGenre = (g) => {
    dispatch({ type: "SET_GENRE", payload: g });

    const top = tabsRef.current?.offsetTop || 0;
    window.scrollTo({
      top: top - 20,
      behavior: "smooth",
    });

    setShowTabs(false);
  };

  const handlePageChange = (selected) => {
    dispatch({ type: "SET_PAGE", payload: selected.selected + 1 });
    const top = tabsRef.current?.offsetTop || 0;
    window.scrollTo({
      top: top - 20,
      behavior: "smooth",
    });
  };

  // if (loading) return <Loader />;
  if (error) return <p className="text-center">{error}</p>;
  if (!movies.length) return null;

  return (
    <div ref={tabsRef} className="py-2 md:py-0">
      <div className="md:hidden text-center">
        <button
          onClick={() => setShowTabs(!showTabs)}
          className="mb-5 px-4 py-2 w-[50%] bg-green-700 text-white rounded-full flex items-center justify-center gap-2 mx-auto"
        >
          {showTabs ? "Hide Genres" : "Select Genre"}
          {showTabs ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
        </button>

        {!showTabs && (
          <h3 className="mt-6 text-2xl font-semibold text-green-800 flex items-center justify-center gap-2">
            {genre?.name ? `${genre.name} Movies` : "Select a Genre"}
          </h3>
        )}
      </div>
      <div
        className={`${
          showTabs ? "flex" : "hidden"
        } md:flex flex-wrap justify-center gap-2 md:mb-3`}
      >
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => selectGenre(g)}
            className={`whitespace-nowrap md:text-lg px-3 py-1 md:px-4 md:py-2 rounded-full font-bold cursor-pointer hover:bg-green-700 hover:text-white border md:border-2 border-green-400 ${
              genre?.id === g.id
                ? "bg-green-700 text-white active-tab"
                : "text-green-800"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="pt-8 md:pt-12">
        <MovieList movies={movies} />
      </div>

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
            previousClassName={"border border-green-400 rounded cursor-pointer"}
            nextClassName={"border border-green-400 rounded cursor-pointer"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            forcePage={currentPage - 1}
          />
        </div>
      )}
    </div>
  );
}
