import "./AppLayout.module.css";
import { Link } from "react-router-dom";
import { Button, Field, Input } from "@headlessui/react";
import ListGames from "../../ListGames/ListGames.jsx";
import { WSMessageContext } from "../context/WSMessageContext.jsx";
import PropTypes from "prop-types";

export default function AppLayout({ handleInputChange, lastMessage, createLobby }) {
  AppLayout.propTypes = {
    handleInputChange: PropTypes.func,
    lastMessage: PropTypes.string,
  };
  return (
    <div className="bg-emerald-200">
      <WSMessageContext.Provider value={lastMessage}>
        <ListGames />
      </WSMessageContext.Provider>
      <Field>
        <Input
          onChange={handleInputChange}
          className="border-4"
          name="game_name"
          type="text"
        />
      </Field>
      <Link to="/CreateLobby" onClick={createLobby}>
        <Button
          className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
          name="add_game"
        >
          Create Game
        </Button>
      </ Link>
    </div>
  );
}
