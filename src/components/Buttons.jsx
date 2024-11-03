import { Button } from "@headlessui/react";

export const ButtonFilled = ({ children, onClick, className, onmouseenter, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      className={`my-1 border-2 border-[#5f2536] bg-[#8d0801] py-2 text-center text-sm font-medium text-slate-200 data-[hover]:bg-[#dfd4c6] data-[hover]:data-[active]:bg-[#2f4550] data-[hover]:text-slate-800 sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
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
      className={`my-1 border-2 border-[#6E2E41] py-2 text-center text-sm font-medium text-slate-800 data-[hover]:bg-[#DFD4C6] data-[hover]:data-[active]:bg-[#2f4550] data-[hover]:text-slate-700 sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
    >
      {children}
    </Button>
  );
};
