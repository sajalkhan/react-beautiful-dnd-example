import React from "react";
import { mapModifiers, ModifierProp } from "../../libs/component";
import "./index.scss";

export interface FixedControlProps {
  children?: React.ReactNode;
  modifiers?: ModifierProp<"single-btn" | "btn-container">;
  id?: string;
  className?: string;
  isVisible?: boolean;
}

export const FixedControl: React.FC<FixedControlProps> = ({
  children,
  modifiers,
  id,
  className: additionalClassName = "",
  isVisible,
}) => {
  const componentClassName = mapModifiers(
    "o-fixed-control",
    modifiers,
    isVisible && "visible",
    !isVisible && "hidden"
  );
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};
