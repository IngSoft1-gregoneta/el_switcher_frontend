import "./AppLayout.module.css";
import { Link } from "react-router-dom";
import { Button, Field, Input } from "@headlessui/react";
import ListGames from "../../ListGames/ListGames.jsx";
import { WSMessageContext } from "../context/WSMessageContext.jsx";
import PropTypes from "prop-types";

//TODO: poner addGame donde pertence
export default function AppLayout({ lastMessage, createRoom }) {
  AppLayout.propTypes = {
    createRoom: PropTypes.func,
    lastMessage: PropTypes.string,
  };

  return (
    <div className="bg-emerald-200">
      <WSMessageContext.Provider value={lastMessage}>
        <ListGames />
      </WSMessageContext.Provider>
      <Link to="/CreateRoom" onClick={createRoom}>
        <Button
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
          name="add_game"
        >
          Create Game
        </Button>
      </Link>
    </div>
  );
}
