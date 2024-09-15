import "./AppLayout.module.css";
import { Button, Field, Input } from "@headlessui/react";
import ListGames from "../../ListGames/ListGames.jsx";
import { WSMessageContext } from "../../WSMessageContext.js";
import PropTypes from "prop-types";

//TODO: poner addGame donde pertence
export default function AppLayout({ handleInputChange, lastMessage, addGame }) {
  AppLayout.propTypes = {
    handleInputChange: PropTypes.func,
    lastMessage: PropTypes.string,
    // El de addGame no esta porque no deberia ir en esta parte
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
      <Button
        className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
        name="add_game"
        onClick={addGame}
      >
        Añadir juego
      </Button>
    </div>
  );
}
