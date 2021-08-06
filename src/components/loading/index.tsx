import React from "react";
import { mapModifiers } from "../../libs/component";
import "./index.scss";

export interface LoadingProps {
  className?: string;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  className: additionalClassName = "",
  overlay,
}) => {
  const componentClassName = mapModifiers("a-loading", overlay && "overlay");
  const className = `${componentClassName} ${additionalClassName}`.trim();
  return (
    <div className={className}>
      <div className="a-loading__spinner" />
    </div>
  );
};
