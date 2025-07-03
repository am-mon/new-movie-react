import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import MovieDetailPage from "./pages/MovieDetailPage";
import CastDetailPage from "./pages/CastDetailPage";
import SearchResults from "./pages/SearchResults";

const TRACKING_ID = "G-015QD939P7";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

export default function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<MovieDetailPage />} />
          <Route path="cast/:id" element={<CastDetailPage />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
