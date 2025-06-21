export const initialState = {
  genre: "Action",
  movies: [],
  loading: false,
  currentPage: 1,
  error: null,
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_GENRE":
      return { ...state, genre: action.payload, currentPage: 1 };
    case "SET_MOVIES":
      return { ...state, movies: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
