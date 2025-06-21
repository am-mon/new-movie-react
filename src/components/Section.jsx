import React from "react";

export default function Section({ children, bg = "bg-green-50" }) {
  return (
    <div className={bg}>
      <div className="container mx-auto px-4 py-20">{children}</div>
    </div>
  );
}
