import React from "react";
import Board from "./components/Board.jsx";

export default function Game() {
  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
      <div className="container col-span-1 row-span-1 border bg-gray-50"></div>
      <div className="container col-span-2 row-span-1 border bg-gray-500"></div>
      <div className="container col-span-1 row-span-1 border bg-gray-50"></div>

      <div className="container col-span-1 row-span-2 border bg-blue-500"></div>

      <div className="align-center col-span-2 row-span-2 flex items-center justify-center overflow-hidden border">
        <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
          <Board />
        </div>
      </div>
      <div className="container col-span-1 row-span-2 border bg-pink-500"></div>

      <div className="col-span-4 row-span-1 bg-red-500">
        {/* <div className="container border bg-red-500"></div> */}
        {/* <div className="container border bg-green-500"></div> */}
      </div>
    </div>
  );
}

