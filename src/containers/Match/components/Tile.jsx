import React from "react";

export default function Tile({ color }) {
  return (
    <div
      className={`tile ${color} m-1 h-6 w-6 rounded sm:h-12 sm:w-12 md:h-12 md:w-12`}
    ></div>
  );
}

