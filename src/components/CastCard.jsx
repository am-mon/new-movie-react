import { Link } from "react-router-dom";

export default function CastCard({ cast }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="text-center text-sm md:text-base">
      <Link to={`/cast/${cast.id}`}>
        <div
          className="relative mb-2 w-full pb-[130%] bg-cover bg-top rounded-2xl bg-zinc-200 hover:opacity-80"
          style={{ backgroundImage: `url(${IMAGE_BASE}${cast.profile_path})` }}
        >
          {/* <img
            src={`${IMAGE_BASE}${cast.profile_path}`}
            alt={cast.title}
            className="rounded-xl mb-2"
          /> */}
          {!cast.profile_path && (
            <div className="absolute w-full h-full flex items-center justify-center text-gray-400 px-3">
              No Image Available
            </div>
          )}
        </div>
        <h3>{cast.name}</h3>
        {cast.character && <p className="text-gray-500">({cast.character})</p>}
      </Link>
    </div>
  );
}
