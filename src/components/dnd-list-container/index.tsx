import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import update from "immutability-helper";
import { mapModifiers } from "../../libs/component";
import { DndListItem } from "../dnd-list-item";

export interface DndItemsValue {
  id: string;
  title: string;
}

export interface DndListContainerProps {
  lists: DndItemsValue[];
  className?: string;
  onStart?: () => void;
  onEnd?: (value: DndItemsValue[]) => void;
  onUpdate?: () => void;
  removeItem?: (id: number) => void;
}

export const DndListContainer: React.FC<DndListContainerProps> = ({
  lists,
  className: additionalClassName = "",
  onStart,
  onEnd,
  onUpdate,
  removeItem,
}) => {
  const componentClassName = mapModifiers("o-dnd-list-container");
  const className = `${componentClassName} ${additionalClassName}`.trim();
  const [items, setItems] = useState<DndItemsValue[]>(lists);

  useEffect(() => setItems(lists), [lists]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDragStart = (initial: DragStart) => {
    onStart && onStart();
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reOrderItems = update(items, {
      $splice: [
        [result.source.index, 1],
        [result.destination.index, 0, items[result.source.index]],
      ],
    });

    setItems(reOrderItems);
    onEnd && onEnd(reOrderItems);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDragUpdate = (initial: DragUpdate) => {
    onUpdate && onUpdate();
  };

  const handleRemoveItem = (id: string) => {
    const removedItems = items.filter((item) => item.id !== id);
    setItems(removedItems);
    onEnd && onEnd(removedItems);
    removeItem && removeItem(Number(id));
  };

  const elements = items.map((list, index) => (
    <DndListItem
      key={list.id}
      id={list.id}
      index={index}
      onRemove={handleRemoveItem}
    >
      {list.title}
    </DndListItem>
  ));

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            className={`${className} ${
              snapshot.isDraggingOver
                ? "o-dnd-list-container--dragging-over"
                : ""
            }`.trim()}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {elements}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
