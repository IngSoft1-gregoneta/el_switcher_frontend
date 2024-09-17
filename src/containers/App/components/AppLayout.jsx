import "./AppLayout.module.css";
import { Button, Field, Input } from "@headlessui/react";
import ListGames from "../../ListGames/ListGames.jsx";
import { WSMessageContext } from "../../WSMessageContext.js";
import PropTypes from "prop-types";

//TODO: poner addGame donde pertence
export default function AppLayout({ lastMessage }) {
  AppLayout.propTypes = {
    handleInputChange: PropTypes.func,
    lastMessage: PropTypes.string,
  };

  return (
    <WSMessageContext.Provider value={lastMessage}>
      <ListGames />
    </WSMessageContext.Provider>
  );
}
