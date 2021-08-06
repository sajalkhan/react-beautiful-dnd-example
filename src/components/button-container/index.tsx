import React from "react";
import { mapModifiers, ModifierProp } from "../../libs/component";
import "./index.scss";

export interface ButtonContainerProps {
  children?: React.ReactNode;
  modifiers?: ModifierProp<"horizontal" | "veritcal" | "border">;
  id?: string;
  className?: string;
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  modifiers = "horizontal",
  id,
  className: additionalClassName = "",
}) => {
  const componentClassName = mapModifiers("m-button-container", modifiers);
  const className = `${componentClassName} ${additionalClassName}`.trim();
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};
