import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api/omdb";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/navigation";

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getNowPlayingMovies();
      setMovies(data);
      // console.log(data);
    };
    fetchMovie();
  }, []);

  if (!movies.length) return null;

  return (
    <div>
      <Swiper
        modules={[Autoplay, Parallax, Navigation]}
        spaceBetween={0}
        speed={1000}
        parallax={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
        }}
      >
        {movies.map((m) => (
          <SwiperSlide key={m.id} className="w-[200px]">
            <Link to={`/movies/${m.id}`}>
              <div className="relative">
                <img
                  src={`${IMAGE_BASE}${m.poster_path}`}
                  alt={m.title}
                  className="w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-green-900/[.8] text-white text-center p-5 shadow-2xl shadow-yellow-500/50">
                  <h3 className="text-2xl mb-4">{m.title}</h3>
                  <div>
                    <StarRating rating={m.vote_average} />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
