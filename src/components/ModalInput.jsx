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
import { ButtonFilled, ButtonUnfilled } from "./Buttons";
import clicksound from "../containers/assets/clicksound.wav";
import entersound from "../containers/assets/entersound.wav";

// Puede parecer confuso, pero la idea de este modal es solo para recibir un input y una funcion la cual utilizara este input
export default function ModalInput({
  isOpen,
  setIsOpen,
  title,
  desc,
  handleClickAceptar,
  handleClickCancelar,
  has_password,
}) {
  const [input, setInput] = useState(null);
  const [password, setPassword] = useState(null);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function clickplay() {
    new Audio(clicksound).play();
  }
  function enterplay() {
    new Audio(entersound).play();
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
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
                    {title}
                  </DialogTitle>
                  <Field className="space-y-3">
                    <Description>{desc}</Description>
                    <Input
                      className="block w-full border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm sm:leading-6"
                      name="username"
                      onChange={handleInputChange}
                    />
                  </Field>
                  {has_password && (
                    <>
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-cyan-950"
                      >
                        Contraseña
                      </DialogTitle>
                      <Field className="space-y-3">
                        <Description>
                          La sala es privada, por favor escriba la contraseña
                        </Description>
                        <Input
                          className="block w-full border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm sm:leading-6"
                          name="username"
                          onChange={handlePasswordChange}
                        />
                      </Field>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <ButtonFilled
                onmouseenter={enterplay}
                onClick={() => {
                  has_password
                    ? handleClickAceptar({ input: input, password: password })
                    : handleClickAceptar(input);
                  clickplay();
                  setIsOpen(false);
                }}
              >
                Aceptar
              </ButtonFilled>
              <ButtonUnfilled
                onmouseenter={enterplay}
                onClick={() => {
                  handleClickCancelar();
                  clickplay();
                  setIsOpen(false);
                }}
              >
                Cancelar
              </ButtonUnfilled>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
