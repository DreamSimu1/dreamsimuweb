// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Sprint.css";
// import TopNav from "../TopNav";

// const Sprint = () => {
//   const [tasks, setTasks] = useState({
//     todo: [
//       { id: "1", title: "Design Homepage", day: "Day 1", note: "" },
//       { id: "2", title: "Write Blog Post", day: "Day 2", note: "" },
//       { id: "3", title: "Setup API", day: "Day 3", note: "" },
//       { id: "4", title: "New set 4", day: "Day 4", note: "" },
//       { id: "5", title: "New set 5", day: "Day 5", note: "" },
//       { id: "6", title: "New set 6", day: "Day 6", note: "" },
//       { id: "7", title: "New set 7", day: "Day 7", note: "" },
//     ],
//     inProgress: [],
//     completed: [],
//   });

//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [newNote, setNewNote] = useState("");

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceColumn = tasks[source.droppableId];
//     const destColumn = tasks[destination.droppableId];
//     const [removed] = sourceColumn.splice(source.index, 1);
//     destColumn.splice(destination.index, 0, removed);

//     setTasks({
//       ...tasks,
//       [source.droppableId]: sourceColumn,
//       [destination.droppableId]: destColumn,
//     });
//   };

//   const openNoteModal = (task) => {
//     setSelectedTask(task);
//     setNewNote(task.note || "");
//     setIsNoteModalOpen(true);
//   };

//   const saveNote = () => {
//     const updatedTasks = { ...tasks };
//     for (const column in updatedTasks) {
//       updatedTasks[column] = updatedTasks[column].map((t) =>
//         t.id === selectedTask.id ? { ...t, note: newNote } : t
//       );
//     }
//     setTasks(updatedTasks);
//     setIsNoteModalOpen(false);
//   };

//   return (
//     <>
//       <body>
//         <div className="main-wrapper">
//           {/*}  <SideNav />*/}
//           <TopNav />

//           <div
//             className="page-wrapper"
//             style={{ marginBottom: "100px", width: "100%", margin: "auto" }}
//           >
//             <div className="content">
//               <div className="sprint-container">
//                 <h2 className="sprint-title">Sprint Board</h2>
//                 <p className="sprint-description">
//                   Drag tasks between columns to manage your progress.
//                 </p>

//                 <DragDropContext onDragEnd={onDragEnd}>
//                   <div className="columns-container">
//                     {/* Day Column */}
//                     <div className="column">
//                       <h3 style={{ color: "white" }}>Day</h3>
//                       <div>
//                         {tasks.todo.map((task) => (
//                           <div key={task.id} className="day-row">
//                             {task.day}
//                           </div>
//                         ))}
//                         {tasks.inProgress.map((task) => (
//                           <div key={task.id} className="day-row">
//                             {task.day}
//                           </div>
//                         ))}
//                         {tasks.completed.map((task) => (
//                           <div key={task.id} className="day-row">
//                             {task.day}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* To-Do Column */}
//                     <Droppable droppableId="todo">
//                       {(provided) => (
//                         <div
//                           className="column"
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           <h3>To-Do</h3>
//                           {tasks.todo.map((task, index) => (
//                             <Draggable
//                               key={task.id}
//                               draggableId={task.id}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="task"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   {task.title}
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>

//                     {/* In Progress Column */}
//                     <Droppable droppableId="inProgress">
//                       {(provided) => (
//                         <div
//                           className="column"
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           <h3>In Progress</h3>
//                           {tasks.inProgress.map((task, index) => (
//                             <Draggable
//                               key={task.id}
//                               draggableId={task.id}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="task"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   {task.title}
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>

//                     {/* Completed Column */}
//                     <Droppable droppableId="completed">
//                       {(provided) => (
//                         <div
//                           className="column"
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           <h3>Completed</h3>
//                           {tasks.completed.map((task, index) => (
//                             <Draggable
//                               key={task.id}
//                               draggableId={task.id}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="task"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   {task.title}
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>

//                     {/* Note Column */}
//                     <div className="column">
//                       <h3>Note</h3>
//                       <div>
//                         {tasks.todo
//                           .concat(tasks.inProgress, tasks.completed)
//                           .map((task) => (
//                             <div key={task.id} className="note-row">
//                               <button
//                                 className="note-button"
//                                 onClick={() => openNoteModal(task)}
//                               >
//                                 {task.note ? "Edit Note" : "Add Note"}
//                               </button>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   </div>
//                 </DragDropContext>

//                 {/* Note Modal */}
//                 {isNoteModalOpen && (
//                   <div className="note-modal">
//                     <div className="note-modal-content">
//                       <h3>Note for {selectedTask.title}</h3>
//                       <textarea
//                         value={newNote}
//                         onChange={(e) => setNewNote(e.target.value)}
//                         placeholder="Write your note here..."
//                       />
//                       <div className="modal-actions">
//                         <button className="save-button" onClick={saveNote}>
//                           Save Note
//                         </button>
//                         <button
//                           className="cancel-button"
//                           onClick={() => setIsNoteModalOpen(false)}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// // export default Sprint;

// import React, { useState, useEffect } from "react";

// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Sprint.css";
// import TopNav from "../TopNav";

// const Sprint = () => {
//   const { ideaId } = useParams(); // Get the ideaId from the URL
//   console.log("Idea ID:", ideaId);
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const [tasks, setTasks] = useState({
//     todo: [],
//     inProgress: [],
//     completed: [],
//   });

//   const [refinements, setRefinements] = useState([]);

//   useEffect(() => {
//     // Fetch activities based on ideaId
//     const fetchActivities = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await axios.get(
//           `${apiUrl}/api/refines-by-idea-title?title=${encodeURIComponent(
//             ideaId
//           )}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRefinements(response.data.refines);
//       } catch (error) {
//         console.error("Error fetching refinements:", error);
//       }
//     };

//     fetchActivities();
//   }, [ideaId]);
//   console.log(
//     `Requesting URL: ${apiUrl}/api/refines-by-idea-title?title=${encodeURIComponent(
//       ideaId
//     )}`
//   );

//   // Map refinements to tasks
//   useEffect(() => {
//     const initialTasks = {
//       todo: refinements.map((refine) => ({
//         id: refine._id,
//         title: refine.activities,
//         day: "Day 1", // You can add specific days if needed
//         note: "",
//       })),
//       inProgress: [],
//       completed: [],
//     };
//     setTasks(initialTasks);
//   }, [refinements]);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceColumn = tasks[source.droppableId];
//     const destColumn = tasks[destination.droppableId];
//     const [removed] = sourceColumn.splice(source.index, 1);
//     destColumn.splice(destination.index, 0, removed);

//     setTasks({
//       ...tasks,
//       [source.droppableId]: sourceColumn,
//       [destination.droppableId]: destColumn,
//     });
//   };

//   return (
//     <div className="sprint-container">
//       <h2 className="sprint-title">Sprint Board</h2>
//       <p className="sprint-description">
//         Drag tasks between columns to manage your progress.
//       </p>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="columns-container">
//           {/* To-Do Column */}
//           <Droppable droppableId="todo">
//             {(provided) => (
//               <div
//                 className="column"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 <h3>To-Do</h3>
//                 {tasks.todo.map((task, index) => (
//                   <Draggable key={task.id} draggableId={task.id} index={index}>
//                     {(provided) => (
//                       <div
//                         className="task"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         {task.title}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {/* In Progress Column */}
//           <Droppable droppableId="inProgress">
//             {(provided) => (
//               <div
//                 className="column"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 <h3>In Progress</h3>
//                 {tasks.inProgress.map((task, index) => (
//                   <Draggable key={task.id} draggableId={task.id} index={index}>
//                     {(provided) => (
//                       <div
//                         className="task"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         {task.title}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {/* Completed Column */}
//           <Droppable droppableId="completed">
//             {(provided) => (
//               <div
//                 className="column"
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//               >
//                 <h3>Completed</h3>
//                 {tasks.completed.map((task, index) => (
//                   <Draggable key={task.id} draggableId={task.id} index={index}>
//                     {(provided) => (
//                       <div
//                         className="task"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         {task.title}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Sprint;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Sprint.css";
import TopNav from "../TopNav";

const Sprint = () => {
  const { ideaId } = useParams(); // Get the ideaId from the URL
  console.log("Idea ID:", ideaId);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [refinements, setRefinements] = useState([]);

  useEffect(() => {
    // Fetch refinements based on ideaId
    const fetchRefinements = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${apiUrl}/api/refines-by-idea-id?id=${encodeURIComponent(ideaId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRefinements(response.data.refines);
      } catch (error) {
        console.error("Error fetching refinements:", error);
      }
    };

    fetchRefinements();
  }, [ideaId]);

  // Map refinements to tasks
  useEffect(() => {
    const initialTasks = {
      todo: refinements.map((refine) => ({
        id: refine._id,
        title: refine.activities,
        day: "Day 1", // You can add specific days if needed
        note: "",
      })),
      inProgress: [],
      completed: [],
    };
    setTasks(initialTasks);
  }, [refinements]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <>
      <body>
        <div className="main-wrapper">
          {/*}  <SideNav />*/}
          <TopNav />

          <div
            className="page-wrapper"
            style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
          >
            <div className="content">
              <div className="sprint-container">
                <h2 className="sprint-title">Sprint Board</h2>
                <p className="sprint-description">
                  Drag tasks between columns to manage your progress.
                </p>

                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="columns-container">
                    {/* To-Do Column */}
                    <Droppable droppableId="todo">
                      {(provided) => (
                        <div
                          className="column"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <h3>To-Do</h3>
                          {tasks.todo.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="task"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {task.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* In Progress Column */}
                    <Droppable droppableId="inProgress">
                      {(provided) => (
                        <div
                          className="column"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <h3>In Progress</h3>
                          {tasks.inProgress.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="task"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {task.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* Completed Column */}
                    <Droppable droppableId="completed">
                      {(provided) => (
                        <div
                          className="column"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <h3>Completed</h3>
                          {tasks.completed.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="task"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {task.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Sprint;
