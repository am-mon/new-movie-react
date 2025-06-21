import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetailPage from "./pages/MovieDetailPage";
import MainLayout from "./layouts/MainLayout";
import CastDetailPage from "./pages/CastDetailPage";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/cast/:id" element={<CastDetailPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
