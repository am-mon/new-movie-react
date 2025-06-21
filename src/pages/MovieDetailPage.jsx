import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getMovieDetails, getVideo } from "../api/omdb";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import StarRating from "../components/StarRating";
import SocialShare from "../components/SocialShare";
import CastCard from "../components/CastCard";

export default function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch {
        setError("Failed to load movie details.");
      }

      try {
        const videoData = await getVideo(id);
        setVideo(videoData);
        console.log("videoData:", videoData);
      } catch {
        setError("Failed to load video.");
      }

      try {
        const castData = await getMovieCredits(id);
        setCast(castData);
      } catch {
        console.log("Cast not available");
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found.</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-14">
        <Link to="/" className="hover:underline inline-block">
          ← Back to movies
        </Link>
      </div>

      <div className="container mx-auto mb-18 px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-[35%]">
            <div
              className="relative mb-2 w-full pb-[150%] bg-cover bg-center rounded-2xl bg-zinc-200"
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
                <div className="absolute w-full h-full flex items-center justify-center text-gray-400 px-3">
                  No Image Available
                </div>
              )}
            </div>
          </div>
          <div className="md:w-[65%] mt-6 md:mt-0 md:pl-16">
            <div className="mb-3">
              <span className="py-2 px-5 bg-green-600 font-bold text-white inline-block rounded">
                {movie.status}
              </span>
            </div>
            <div className="my-3">Released Date: {movie.release_date}</div>
            <div>
              <StarRating rating={movie.vote_average} align="justify-start" />
            </div>
            <h1 className="text-4xl font-bold mt-10 mb-5 text-green-700">
              {movie.title}
            </h1>
            {movie.tagline && (
              <div className="my-5 text-xl font-bold italic flex items-center gap-1">
                <span>{movie.tagline}</span>
              </div>
            )}
            <p className="mb-5 text-lg">{movie.overview}</p>
            <SocialShare title={movie.title} />
          </div>
        </div>
      </div>
      {/* {video && (
        <div className="bg-green-600 p-4">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.key}?controls=0`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )} */}
      {video.length > 0 && (
        <div className="bg-black">
          <div className="container mx-auto py-10 px-4">
            <div
              className={`grid gap-10 ${
                video.length === 1
                  ? "grid-cols-1"
                  : video.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {video.slice(0, 6).map((v, index) => (
                <div key={v.key || index} className="relative w-full">
                  <div className="pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${v.key}`}
                      title={`Movie Trailer ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <div className="container mx-auto my-20 px-4">
          <h2 className="mb-14 font-bold text-center text-green-700 text-3xl md:text-4xl">
            Starring In This Movie
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-5">
            {cast.map((c) => (
              <CastCard cast={c} key={c.cast_id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
