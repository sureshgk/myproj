import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

import Column from "./components/columns";

function App() {
  let dataArr = [
    {
      groupName: "Open",
      tasks: [{id: "1", title: "Suresh"},{id: "2", title: "Anbu"},{id: "3", title: "Resource-3"},{id: "4", title: "Resource-4"}]
    },
    {
      groupName: "Contacted",
      tasks: [{id: "5", title: "Resource-5"},{id: "6", title: "Resource-6"},{id: "7", title: "Resource-7"}]
    },
    {
      groupName: "Written Test",
      tasks: [{ id: "9", title: "Resource-9" }, { id: "10", title: "Resource-10" }, { id: "15", title: "Resource-15" }]
    },
    {
      groupName: "Technical Round",
      tasks: [{ id: "11", title: "Resource-11" }, { id: "12", title: "Resource-12" }]
    },
    {
      groupName: "Culture Fit Round",
      tasks: [{ id: "13", title: "Resource-13" }, { id: "14", title: "Resource-14" }]
    }
  ];

  const [taskList, setTasks] = useState(dataArr);
  const [searchVal, setSearchVal] = useState('');

  function onDragEnd(val) {
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList.filter(
      column => column.groupName === source.droppableId
    );

    const [destinationGroup] = destination
      ? taskList.filter(column => column.groupName === destination.droppableId)
      : { ...sourceGroup };

    const [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);

    const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
    const newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    );

    const newTaskList = taskList.map(column => {
      if (column.groupName === source.groupName) {
        return {
          groupName: column.groupName,
          tasks: newSourceGroupTasks
        };
      }
      if (column.groupName === destination.groupName) {
        return {
          groupName: column.groupName,
          tasks: newDestinationGroupTasks
        };
      }
      return column;
    });

    setTasks(newTaskList);
  }


  const handleChange = function(e){
    setSearchVal(e.target.value);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="searchHolder">
        <div className="searchBar"><input type="text" onChange={handleChange} /></div>
      </div>
      <div className="wrapper">
        <Column className="column" droppableId="Open" list={taskList[0].tasks} type="TASK" searchVal={searchVal} />
        <Column className="column" droppableId="Contacted" list={taskList[1].tasks} type="TASK" searchVal={searchVal} />
        <Column className="column" droppableId="Written Test" list={taskList[2].tasks} type="TASK" searchVal={searchVal} />
        <Column className="column" droppableId="Technical Round" list={taskList[3].tasks} type="TASK" searchVal={searchVal} />
        <Column className="column" droppableId="Culture Fit Round" list={taskList[4].tasks} type="TASK" searchVal={searchVal} />
      </div>
    </DragDropContext>
  );
}

export default App;
