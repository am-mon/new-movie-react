import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActor, getActorMovies } from "../api/omdb";
import SocialShare from "../components/SocialShare";
import Section from "../components/Section";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

export default function CastDetailPage() {
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [castMovies, setCastMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const castData = await getActor(id);
        // console.log(castData);
        setCast(castData);
      } catch (error) {
        setError("Failed to load cast.");
      }

      try {
        const castMovies = await getActorMovies(id);
        console.log("castMovies:", castMovies);
        setCastMovies(castMovies);
      } catch (error) {
        setError("Failed to load cast movies.");
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!castMovies) return <p>No movie found.</p>;

  return (
    <>
      {cast && (
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-[35%]">
              <div
                className="relative mb-2 w-full pb-[150%] bg-cover bg-center rounded-2xl bg-zinc-200"
                style={{
                  backgroundImage: `url(${IMAGE_BASE}${cast.profile_path})`,
                }}
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
            </div>
            <div className="md:w-[65%] mt-6 md:mt-0 md:pl-16">
              <h1 className="text-4xl font-bold mb-5 text-green-700">
                {cast.name}
              </h1>

              {cast.birthday && (
                <p>
                  <b>Birthday:</b> {cast.birthday}
                </p>
              )}

              {cast.place_of_birth && (
                <p>
                  <b>Place of Birth:</b> {cast.place_of_birth}
                </p>
              )}

              {cast.known_for_department && (
                <p>
                  <b>Known for:</b> {cast.known_for_department}
                </p>
              )}

              {cast.also_known_as && cast.also_known_as.length > 0 && (
                <p>
                  <b>Also Known As:</b> {cast.also_known_as.join(", ")}
                </p>
              )}

              {cast.biography && (
                <p className="my-5 text-lg">{cast.biography}</p>
              )}

              <SocialShare title={cast.name} />
            </div>
          </div>
        </div>
      )}

      {castMovies?.length > 0 && loading === false && (
        <div className="container mx-auto px-4 py-10 mb-10">
          <h2 className="mb-14 font-bold text-center text-green-700">
            <span className="text-2xl md:text-4xl">
              {cast?.name}'s Movies&nbsp;
            </span>
            <span className="block md:inline text-lg text-gray-700">
              ({castMovies.length} Results)
            </span>
          </h2>
          <MovieList movies={castMovies} />
        </div>
      )}
    </>
  );
}
