import { Button } from "@headlessui/react";

export const ButtonFilled = ({ children, onClick, className, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`mb-2 me-2 border border-cyan-600 bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-50 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-white ${className}`}
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
      className={`mb-2 me-2 border border-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-cyan-700 data-[hover]:bg-cyan-800 data-[hover]:data-[active]:bg-cyan-700 data-[hover]:text-cyan-200 ${className}`}
    >
      {children}
    </Button>
  );
};
