import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Box from "./box";

function Column(props) {
  const { droppableId, list, type, searchVal } = props;
  return (
    <Droppable droppableId={droppableId} type={type}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="eachColumnHolder">
          <div className="eachColumnHeader">{droppableId}</div>

          {list.map((val, index) => {
            return (
              <Box id={val.id} key={val.id} index={index} title={val.title} searchVal={searchVal} />
            );
          })}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
