import { useState } from 'react';
import { Dialog, Transition, TransitionChild, DialogTitle, Description } from '@headlessui/react';
import { Field } from '@headlessui/react';

export default function RoomDialog({ isOpen, onClose, onOwnerName }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmitDialog = (e) =>{
    onClose(false);
    onOwnerName(playerName);
  }

  return (
    <Transition show={isOpen} as="div" className="relative z-10">
      <Dialog onClose={onClose} className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        >
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Please Enter a Player Name
          </DialogTitle>
          <Description className="mt-2 text-sm text-gray-500">
            Provide the name for the player to join the game.
          </Description>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="mt-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="mt-4 flex justify-end">
            <button
            type='submit'
              onClick={handleSubmitDialog}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
