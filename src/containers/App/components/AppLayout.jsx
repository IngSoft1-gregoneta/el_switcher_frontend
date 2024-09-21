import "./AppLayout.module.css";
import { WSMessageContext } from "../context/WSMessageContext.js";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
import ListRooms from "../../ListRooms/ListRooms.jsx";
import PropTypes from "prop-types";

//TODO: poner addGame donde pertence
export default function AppLayout({ lastMessage, createRoom }) {
  AppLayout.propTypes = {
    createRoom: PropTypes.func,
    lastMessage: PropTypes.string,
  };

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center p-4">
      <h1 className="m-8 text-center font-serif text-4xl font-bold text-emerald-900">
        EL SWITCHER
      </h1>
      <WSMessageContext.Provider value={lastMessage}>
        <ListRooms />
      </WSMessageContext.Provider>
      <Link to="/CreateRoom" onClick={createRoom}>
        <Button
          className="mb-2 me-2 border border-cyan-600 bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-50 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-white"
          name="add_game"
        >
          Create Room
        </Button>
      </Link>
    </div>
  );
}
