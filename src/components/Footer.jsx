import React from "react";
import Section from "./Section";
import ScrollToTop from "./ScrollToTop";

export default function Footer() {
  return (
    <div className="bg-green-700">
      <ScrollToTop />
      <div className="container mx-auto px-4 py-8 text-center text-white">
        © 2025 Mon. Learned React.
      </div>
    </div>
  );
}
