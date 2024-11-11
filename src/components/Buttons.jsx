import { Button } from "@headlessui/react";

export const ButtonFilled = ({ children, onClick, onmouseenter, type, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      name="add_game"
      className="button-filled"
    >
      {children}
    </Button>
  );
};

export const ButtonUnfilled = ({ children, onClick, onmouseenter, type, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      className="button-unfilled"
    >
      {children}
    </Button>
  );
};

export const ButtonDangerFilled = ({ children, onClick, onmouseenter, type, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseOver={onmouseenter}
      name="add_game"
      className="button-danger-filled"
    >
      {children}
    </Button>
  );
};


