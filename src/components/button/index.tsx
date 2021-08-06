import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { mapModifiers, ModifierProp } from "../../libs/component";
import { Icon, ICON_SHAPES } from "../../components/icon/";
import "./index.scss";

type InheritedProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "onClick"
> &
  Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "onClick" | "disabled"
  >;

export interface ButtonProps extends InheritedProps {
  children?: React.ReactNode;
  modifiers?: ModifierProp<
    | "primary"
    | "secondary"
    | "third"
    | "postal"
    | "upload"
    | "transparent"
    | "text"
  >;
  shape?: ModifierProp<"square">;
  size?: ModifierProp<"large" | "huge">;
  id?: string;
  className?: string;
  disabled?: boolean;
  useNative?: boolean;
  useNativeHashLink?: boolean;
  icon?: typeof ICON_SHAPES[number];
}

export const Button: React.FC<ButtonProps> = ({
  modifiers,
  shape,
  size,
  children,
  type,
  onClick,
  disabled = false,
  className: additionalClassName = "",
  id,
  icon,
}) => {
  const componentClassName = mapModifiers(
    "a-button",
    modifiers,
    shape,
    size,
    icon && "icon"
  );
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      id={id}
    >
      <div className="a-button__label">{children}</div>
      {icon && <Icon name={icon} />}
    </button>
  );
};
