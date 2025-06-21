import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/style.css";
import { MovieContextProvider } from "./context/MovieContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </StrictMode>
);
