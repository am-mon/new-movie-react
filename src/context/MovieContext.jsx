import React from "react";
import { createContext, useReducer } from "react";
import { movieReducer, initialState } from "./movieReducer";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
