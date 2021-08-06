import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { mapModifiers } from "../../libs/component";
import { Icon } from "../icon";
import "./index.scss";

export interface DndListItemProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  close?: boolean;
  className?: string;
  onRemove?: (id: string) => void;
}

export const DndListItem: React.FC<DndListItemProps> = ({
  children,
  id,
  index,
  close = true,
  className: additionalClassName = "",
  onRemove,
}) => {
  const componentClassName = mapModifiers("m-dnd-list-item");
  const className = `${componentClassName} ${additionalClassName}`.trim();
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${className} ${
            snapshot.isDragging ? "m-dnd-list-item--dragging" : ""
          }`.trim()}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {close && (
            <Icon name="delete-item" onClick={() => onRemove && onRemove(id)} />
          )}
          <div className="m-dnd-list-item__title">{children}</div>
          <Icon name="navbar" />
        </div>
      )}
    </Draggable>
  );
};
