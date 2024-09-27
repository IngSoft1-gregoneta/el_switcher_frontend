import { useState } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  Description,
} from "@headlessui/react";

export default function RoomDialog({ isOpen, onClose, onOwnerName }) {
  const [playerName, setPlayerName] = useState("");

  const handleSubmitDialog = () => {
    onClose(false);
    onOwnerName(playerName);
  };

  return (
    <Transition show={isOpen} as="div" className="relative z-10">
      <Dialog
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4"
      >
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg"
        >
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Please Enter a Player Name
          </DialogTitle>
          <Description className="mt-2 text-sm text-gray-500">
            Provide the name for the player to join the game.
          </Description>
          <input
            aria-label="name-input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="mt-4 w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              onClick={handleSubmitDialog}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
