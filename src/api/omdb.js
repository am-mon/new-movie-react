const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "c05d1c927a4b60ec1fff7ff01f5c3d8d";

export const getNowPlayingMovies = async () => {
  const api = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );
  const response = await api.json();
  return response.results;
};

export const getGenres = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );
  const data = await res.json();
  return data;
};

export const getMovieDetails = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};

export const getVideo = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.results;
};

export const getMovieCredits = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.cast;
};

export const getActor = async (castId) => {
  const res = await fetch(
    `${BASE_URL}/person/${castId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};

export const getActorMovies = async (personId) => {
  const res = await fetch(
    `${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.cast;
};

export const getSearchResults = async (keyword, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${keyword}&page=${page}&api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};
