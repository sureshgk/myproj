import React from "react";
import { Draggable } from "react-beautiful-dnd";

function box(props) {
  const { id, index, title, searchVal } = props;
  return (
    <Draggable draggableId={id} index={index} type="TASK" className="ttt">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="eachBox" style={{ display: title.toLowerCase().includes(searchVal.toLowerCase()) ? "block" : "none" }}>
            {title}
            <div className="starRating"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default box;
