import React from "react";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import StarRating from "./StarRating";

export default function MovieCard({ movie }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w300/";

  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <div
          className="relative mb-3 w-full pb-[150%] bg-cover bg-center rounded-2xl bg-zinc-200 hover:opacity-80"
          style={{
            backgroundImage: `url(${IMAGE_BASE}${movie.poster_path})`,
          }}
        >
          {/* <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl mb-4"
            /> */}
          {!movie.poster_path && (
            <div className="absolute w-full h-full text-center flex items-center justify-center text-gray-400 px-3">
              No Image Available
            </div>
          )}
        </div>
        <StarRating rating={movie.vote_average} />
        <div className="text-green-700 text-center">
          <h3 className="mt-2 my-1 text-base xl:text-xl font-bold">
            {movie.title}
          </h3>
          <p className="mb-4 flex items-center justify-center">
            <span className="mr-2">
              <MdDateRange />
            </span>
            {movie.release_date}
          </p>
        </div>
      </Link>
    </>
  );
}
