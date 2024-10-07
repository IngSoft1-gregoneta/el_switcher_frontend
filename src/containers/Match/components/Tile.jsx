import React from "react";

export default function Tile({ color }) {
    return (
      <div
        className={`tile ${color} m-1 min-h-[50px] min-w-[50px] rounded`}
      ></div>
    );
  }