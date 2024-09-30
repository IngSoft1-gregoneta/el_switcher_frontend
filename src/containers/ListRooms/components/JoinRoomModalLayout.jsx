import {
  Input,
  Field,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { joinRoom } from "../../Room/services/RoomService";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../../services/state";
import { ButtonFilled, ButtonUnfilled } from "../../../components/Buttons";

export default function JoinRoomModalLayout({ roomId, open, setOpen }) {
  JoinRoomModalLayout.propTypes = {
    roomId: PropTypes.number,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  };
  const userId = useIdStore((state) => state.userId);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setUserName(e.target.value);
  }

  async function handleClickAceptar() {
    setOpen(false);
    try {
      await joinRoom({
        room_id: roomId,
        player_name: userName,
        user_id: userId,
      });
      navigate(`/room/${userId}/${roomId}/${userName}`);
    } catch (error) {
      console.log(error);
      navigate("/failed_room");
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 space-y-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-cyan-950"
                  >
                    Unirse a la partida
                  </DialogTitle>
                  <Field className="space-y-3">
                    <Description>
                      Escriba el nombre con el cual quiera ser identificado en
                      la partida
                    </Description>
                    <Input
                      className="block w-full border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm sm:leading-6"
                      name="username"
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <ButtonFilled onClick={() => handleClickAceptar()}>
                Aceptar
              </ButtonFilled>
              <ButtonUnfilled onClick={() => setOpen(false)}>
                Cancelar
              </ButtonUnfilled>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
