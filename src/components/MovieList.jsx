import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w300/";

  if (!movies || movies.length === 0) {
    return <p className="text-center">No movies found.</p>;
  }

  //grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-5
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8">
      {movies?.map((movie) => (
        <div key={movie.id} className="">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
