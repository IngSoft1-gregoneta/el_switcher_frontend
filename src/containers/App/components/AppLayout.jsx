import "./AppLayout.module.css";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
import PropTypes from "prop-types";

export default function AppLayout({ gamesList, fetchGames, createLobby }) {
  AppLayout.propTypes = {
    gamesList: PropTypes.array,
    fetchGames: PropTypes.func.isRequired,
    createLobby: PropTypes.func.isRequired,
  };
  return (
    <div className="mx-auto flex flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">El Switcher</h1>
      <div className="container mb-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Available Games
        </h2>
        <div className="m-8 flex flex-col bg-slate-300 p-8 text-center">
          {gamesList}
        </div>
      </div>
      <div className="m-6">
        <Button
          onClick={fetchGames}
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
        >
          List games (fetch)
        </Button>
      </div>
      <Link to="/CreateLobby" onClick={createLobby}>
        <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500">
          Create New Game
        </Button>
      </Link>
    </div>
  );
}
