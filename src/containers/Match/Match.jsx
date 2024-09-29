import React from "react";
import Board from "./components/Board.jsx";
import { Button } from "@headlessui/react";

export default function Match() {


  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-4">
      <div className="container col-span-1 row-span-1 flex flex-col items-center justify-center border bg-gray-50 text-center">
        <h3 className="font-bold md:text-2xl">Tiempo restante</h3>
        <p className="text-2xl md:text-7xl">00:42</p>
      </div>

      <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <div className="flex flex-col gap-2">
          <div className="flex h-fit flex-row items-center justify-center gap-2">
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
          </div>
          <div className="flex basis-1/12 flex-col md:flex-row">
            <div className="basis-1/6">Pepe</div>
            <div className="basis-4/6" id="separator"></div>
            <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
              Tarjetas Figura: 14/20
            </div>
          </div>
        </div>
      </div>

      <div className="container col-span-1 row-span-1 border bg-gray-50">
        COLOR PROHIBIDO
      </div>

      <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <div className="flex h-fit flex-col items-center justify-center gap-2">
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
          </div>
          <div className="flex basis-1/12 flex-col md:rotate-180 md:flex-row md:gap-14 md:[writing-mode:vertical-lr] lg:gap-32">
            <div className="basis-1/6">Pepe</div>
            <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
              Tarjetas Figura: 14/20
            </div>
          </div>
        </div>
      </div>

      <div className="align-center col-span-2 row-span-2 flex items-center justify-center overflow-hidden border">
        <div className="aspect-square h-full max-h-[100%] w-full max-w-[100%] md:max-h-[90%] md:max-w-[90%]">
          <Board />
        </div>
      </div>

      <div className="align-center col-span-1 row-span-2 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <div className="flex basis-1/12 flex-col md:flex-row md:gap-14 md:[writing-mode:vertical-lr] lg:gap-32">
            <div className="basis-1/6">Pepe</div>
            <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
              Tarjetas Figura: 14/20
            </div>
          </div>
          <div className="flex h-fit flex-col items-center justify-center gap-2">
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
            <div className="aspect-[5/3] w-24 rounded-sm bg-red-500 shadow-lg md:w-32 lg:w-44"></div>
          </div>
        </div>
      </div>

      {/* MOVIMIENTO */}
      <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <div className="flex h-fit w-full flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
          <div className="aspect-[3/5] h-16 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
          <div className="aspect-[3/5] h-16 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
          <div className="aspect-[3/5] h-16 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
        </div>
      </div>

      <div className="align-center col-span-2 row-span-1 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <div className="flex flex-col gap-2">
          <div className="flex basis-1/12 flex-col md:flex-row">
            <div className="basis-1/6">Pepe</div>
            <div className="basis-4/6" id="separator"></div>
            <div className="basis-1/6 md:shrink-0 md:whitespace-nowrap">
              Tarjetas Figura: 14/20
            </div>
          </div>
          <div className="flex h-fit flex-row items-center justify-center gap-2">
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
            <div className="aspect-[3/5] h-24 rounded-sm bg-red-500 shadow-lg md:h-32 lg:h-44"></div>
          </div>
        </div>
      </div>

      <div className="align-center col-span-1 row-span-1 mb-2 flex flex-row items-center justify-center overflow-hidden border bg-gray-500 text-center">
        <Button
          className="mb-2 me-2 border border-cyan-600 bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-50 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-white"
          name="add_game"
        >
          Pasar turno
        </Button>
      </div>
    </div>
  );
}
