import "./AppLayout.module.css";
import ListRooms from "../../ListRooms/ListRooms.jsx";
import { WSMessageContext } from "../../WSMessageContext.js";
import PropTypes from "prop-types";

//TODO: poner addGame donde pertence
export default function AppLayout({ lastMessage }) {
  AppLayout.propTypes = {
    handleInputChange: PropTypes.func,
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
    </div>
  );
}
