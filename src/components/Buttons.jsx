import { Button } from "@headlessui/react";

export const ButtonFilled = ({ children, onClick, className, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`border border-cyan-600 bg-cyan-700 text-center text-sm font-medium text-cyan-50 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-white sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
      name="add_game"
    >
      {children}
    </Button>
  );
};

export const ButtonUnfilled = ({ children, onClick, className, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`border border-cyan-700 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200 sm:mb-2 sm:me-2 sm:px-5 sm:py-2.5 ${className}`}
    >
      {children}
    </Button>
  );
};
