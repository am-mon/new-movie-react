import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import ReactPaginate from "react-paginate";
import { getGenres, getMoviesByGenre } from "../api/omdb";
import MovieList from "./MovieList";
import Loader from "./Loader";

export default function GenreTabs() {
  const { state, dispatch } = useContext(MovieContext);
  const { genre, movies, loading, currentPage, error } = state;
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);

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
  };

  const handlePageChange = (selected) => {
    dispatch({ type: "SET_PAGE", payload: selected.selected + 1 });
    const top = tabsRef.current?.offsetTop || 0;
    window.scrollTo({
      top: top - 20,
      behavior: "smooth",
    });
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center">{error}</p>;
  if (!movies.length) return null;

  return (
    <div ref={tabsRef} className="pt-3 md:pt-10 mt-[-3rem]">
      <div className="overflow-x-auto md:overflow-x-visible py-2 md:py-0">
        <div className="flex md:flex-wrap md:justify-center gap-2 md:mb-3">
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => selectGenre(g)}
              className={`whitespace-nowrap md:text-lg px-3 md:px-4 py-2 rounded-full font-bold cursor-pointer hover:bg-green-700 hover:text-white border md:border-2 border-green-400 ${
                genre?.id === g.id
                  ? "bg-green-700 text-white"
                  : "text-green-800"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-12">
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
