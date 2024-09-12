import "./AppLayout.module.css";
import { useEffect, useState } from "react";
import { Button } from '@headlessui/react'

export default function AppLayout({ gamesList, fetchGames }) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">El Switcher</h1>

      <div className="container  mb-6">
        <h2 className="text-2xl text-center font-semibold mb-4">Available Games</h2>
        <div className="flex  bg-slate-300 m-8 p-8	flex-col text-center">
          {gamesList}
        </div>
      </div>
      <div className="m-6">
        <Button onClick={fetchGames} className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
          List games (fetch)
        </Button>
      </div>
      <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
        Create New Game
      </Button>
    </div>)
};
