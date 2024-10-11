import React from "react";

export default function Tile({ color, figure }) {
  const classAtt =
    figure == "None"
      ? ""
      : "bg-gradient-to-br from-purple-600  to-indigo-700 opacity-55 blur transition duration-500 group-hover:opacity-100";
  return (
    <div className="align-center group relative flex h-8 w-8 items-center justify-center rounded object-center sm:h-16 sm:w-16">
      <div
        data-testid="tile"
        className={`absolute inset-0 z-0 rounded-lg ${classAtt}`}
      ></div>
      <div
        className={`tile ${color} inset-0 z-50 m-1 h-6 w-6 rounded sm:h-12 sm:w-12 md:h-12 md:w-12`}
      ></div>
    </div>
  );
}
