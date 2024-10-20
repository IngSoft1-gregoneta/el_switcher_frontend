import { Button } from "@headlessui/react";

export const ButtonFilled = ({ children, onClick, className, onmouseenter, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      className={`my-1 border border-cyan-600 bg-cyan-700 py-2 text-center text-sm font-medium text-cyan-50 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-white sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
      name="add_game"
    >
      {children}
    </Button>
  );
};

export const ButtonUnfilled = ({ children, onClick, onmouseenter,className, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      className={`my-1 border border-cyan-700 py-2 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200 sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
    >
      {children}
    </Button>
  );
};
