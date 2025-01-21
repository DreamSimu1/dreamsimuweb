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
//     // Fetch refinements based on ideaId
//     const fetchRefinements = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await axios.get(
//           `${apiUrl}/api/refines-by-idea-id?id=${encodeURIComponent(ideaId)}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRefinements(response.data.refines);
//       } catch (error) {
//         console.error("Error fetching refinements:", error);
//       }
//     };

//     fetchRefinements();
//   }, [ideaId]);

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
//     <>
//       <body>
//         <div className="main-wrapper">
//           {/*}  <SideNav />*/}
//           <TopNav />

//           <div
//             className="page-wrapper"
//             style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
//           >
//             <div className="content">
//               <div className="sprint-container">
//                 <h2 className="sprint-title">Sprint Board</h2>
//                 <p className="sprint-description">
//                   Drag tasks between columns to manage your progress.
//                 </p>

//                 <DragDropContext onDragEnd={onDragEnd}>
//                   <div className="columns-container">
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
//                   </div>
//                 </DragDropContext>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// export default Sprint;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Sprint.css";
// import TopNav from "../TopNav";
// import moment from "moment"; // Add this for easier date manipulation

// const Sprint = () => {
//   // const { ideaId } = useParams(); // Get the ideaId from the URL
//   const { activities } = useParams(); // Get title from URL params
//   const decodedActivities = decodeURIComponent(activities); // Decode title to restore spaces
//   const [sprints, setSprints] = useState([]);
//   const [refineId, setRefineId] = useState(null);
//   const [estimatedTime, setEstimatedTime] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showModals, setShowModals] = useState(false);
//   const [showModalss, setShowModalss] = useState(false);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [daysArray, setDaysArray] = useState([]);
//   const [sprintId, setSprintId] = useState(null);

//   const apiUrl = process.env.REACT_APP_API_URL;
//   const [tasks, setTasks] = useState({
//     todo: [],
//     inProgress: [],
//     completed: [],
//   });

//   const [refinements, setRefinements] = useState([]);

//   const fetchSprint = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.get(
//         `${apiUrl}/api/sprint-by-refine-activity?activities=${encodeURIComponent(
//           decodedActivities
//         )}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSprints(response.data.sprints);
//       setRefineId(response.data.refineId);
//       setEstimatedTime(response.data.refineEstimatedTime);
//     } catch (error) {
//       console.error("Error fetching sprints:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSprint();
//   }, [decodedActivities]);
//   // Map refinements to tasks

//   const parseEstimatedTime = () => {
//     try {
//       // Check if estimatedTime is not empty before parsing
//       if (!estimatedTime) {
//         console.error("Estimated time is empty or undefined.");
//         return []; // Return an empty array if estimatedTime is invalid
//       }

//       const estimatedTimeObj = JSON.parse(estimatedTime);
//       const startDate = new Date(estimatedTimeObj.startDate);
//       const endDate = new Date(estimatedTimeObj.endDate);

//       // Create an array of days
//       const days = [];
//       let currentDay = new Date(startDate);
//       let dayCounter = 1;

//       while (currentDay <= endDate) {
//         days.push(`Day ${dayCounter}`);
//         currentDay.setDate(currentDay.getDate() + 1);
//         dayCounter++;
//       }

//       return days;
//     } catch (error) {
//       console.error("Error parsing estimated time:", error);
//       return []; // Return an empty array if parsing fails
//     }
//   };

//   const daysArray = parseEstimatedTime();

//   const onDragEnd = (result) => {
//     const { destination, source } = result;
//     if (!destination) return;

//     const sourceColumn = tasks[source.droppableId];
//     const destColumn = tasks[destination.droppableId];

//     const [movedTask] = sourceColumn.splice(source.index, 1);
//     destColumn.splice(destination.index, 0, movedTask);

//     setTasks({
//       ...tasks,
//       [source.droppableId]: sourceColumn,
//       [destination.droppableId]: destColumn,
//     });
//   };

//   const fetchSprintData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.get(
//         `${apiUrl}/api/sprint-tasks?activities=${encodeURIComponent(
//           decodedActivities
//         )}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setTasks(response.data.tasks); // Load saved tasks from the backend
//       setDaysArray(response.data.days); // Load days array from the backend or parse it
//     } catch (error) {
//       console.error("Error fetching sprint data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSprintData();
//   }, [decodedActivities]);

//   // Add task for the first day (or other days)
//   const handleAddTask = (day) => {
//     if (!newTaskTitle) return;

//     const newTask = {
//       id: (tasks[day].length + 1).toString(),
//       title: newTaskTitle,
//       day: day, // Associate task with specific day
//     };

//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [day]: [newTask, ...prevTasks[day]], // Add new task to the corresponding day
//     }));

//     setNewTaskTitle(""); // Clear the input field after adding the task

//     // Save this task to the backend (or local storage)
//     saveTaskToBackend(day, newTask);
//   };

//   // Save task to the backend
//   const saveTaskToBackend = async (day, task) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       await axios.post(
//         `${apiUrl}/api/save-task`,
//         {
//           task,
//           day,
//           activities: decodedActivities,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error saving task:", error);
//     }
//   };
//   return (
//     <>
//       <body>
//         <div className="main-wrapper">
//           {/*}  <SideNav />*/}
//           <TopNav />

//           <div
//             className="page-wrapper"
//             style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
//           >
//             <div className="content">
//               <div className="sprint-container">
//                 <h2 className="sprint-title">Sprint Board for {activities}</h2>
//                 <p className="sprint-description">
//                   Break down your activities between columns to manage your
//                   progress.
//                 </p>

//                 <DragDropContext onDragEnd={onDragEnd}>
//                   <div className="columns-container">
//                     <Droppable droppableId="days" isDropDisabled={true}>
//                       {(provided) => (
//                         <div
//                           className="column"
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           <h3>Days</h3>
//                           {daysArray.map((day, index) => (
//                             <div key={index} className="day">
//                               {day}
//                             </div>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>
//                     {/* To-Do Column */}
//                     <Droppable droppableId="todo">
//                       {(provided) => (
//                         <div
//                           className="column"
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                         >
//                           <h3>To-Do</h3>

//                           {/* Rendering the existing tasks above the input */}
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

//                           {/* Input area to add new task */}
//                           <div className="task-input-card">
//                             <input
//                               type="text"
//                               placeholder="Enter task title..."
//                               value={newTaskTitle}
//                               onChange={(e) => setNewTaskTitle(e.target.value)}
//                               className="task-input"
//                             />
//                             <button
//                               onClick={handleAddTask}
//                               className="add-task-btn"
//                             >
//                               Add Task
//                             </button>
//                           </div>

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
//                   </div>
//                 </DragDropContext>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// export default Sprint;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Sprint.css";
import TopNav from "../TopNav";
import moment from "moment"; // Add this for easier date manipulation

const Sprint = () => {
  const { activities } = useParams(); // Get title from URL params
  const decodedActivities = decodeURIComponent(activities); // Decode title to restore spaces
  const [sprints, setSprints] = useState([]);
  const [refineId, setRefineId] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalss, setShowModalss] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [sprintId, setSprintId] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [refinements, setRefinements] = useState([]);
  const [daysArray, setDaysArray] = useState([]); // This is the state you will update with the days array

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchSprint = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiUrl}/api/sprint-by-refine-activity?activities=${encodeURIComponent(
          decodedActivities
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSprints(response.data.sprints);
      setRefineId(response.data.refineId);
      setEstimatedTime(response.data.refineEstimatedTime);
    } catch (error) {
      console.error("Error fetching sprints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprint();
  }, [decodedActivities]);

  const parseEstimatedTime = () => {
    try {
      if (!estimatedTime) {
        console.error("Estimated time is empty or undefined.");
        return []; // Return an empty array if estimatedTime is invalid
      }

      const estimatedTimeObj = JSON.parse(estimatedTime);
      const startDate = new Date(estimatedTimeObj.startDate);
      const endDate = new Date(estimatedTimeObj.endDate);

      const days = [];
      let currentDay = new Date(startDate);
      let dayCounter = 1;

      while (currentDay <= endDate) {
        days.push(`Day ${dayCounter}`);
        currentDay.setDate(currentDay.getDate() + 1);
        dayCounter++;
      }

      return days;
    } catch (error) {
      console.error("Error parsing estimated time:", error);
      return [];
    }
  };

  // Update the days array state once estimatedTime is parsed
  useEffect(() => {
    const parsedDays = parseEstimatedTime();
    setDaysArray(parsedDays); // Set the parsed days array to state
  }, [estimatedTime]); // Only run this when estimatedTime changes

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];

    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  // const fetchSprintData = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("jwtToken");
  //     const response = await axios.get(
  //       `${apiUrl}/api/tasks?activities=${encodeURIComponent(
  //         decodedActivities
  //       )}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const tasks = response.data.tasks;

  //     setTasks(tasks); // Load saved tasks from the backend

  //     // Get unique days from the tasks if not already set
  //     const uniqueDays = [
  //       ...new Set(
  //         tasks.map((task) => new Date(task.day).toLocaleDateString())
  //       ),
  //     ];
  //     setDaysArray(uniqueDays); // Only set days if they are not set already
  //   } catch (error) {
  //     console.error("Error fetching sprint data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSprintData();
  // }, [decodedActivities]);

  // const handleAddTask = (e, day) => {
  //   // Ensure you don't pass the whole event object
  //   e.preventDefault(); // prevent default behavior (if needed)

  //   if (!newTaskTitle) return; // Avoid adding empty tasks

  //   // Construct the task object without passing the event object
  //   const newTask = {
  //     id: (tasks[day]?.length + 1 || 1).toString(),
  //     title: newTaskTitle, // Ensure this is a string
  //     day: day, // Use day directly (no event object)
  //     activities: decodedActivities, // Ensure decodedActivities is a simple value
  //   };

  //   // Log the new task for debugging
  //   console.log("New Task to Send:", newTask);

  //   // Update the tasks state
  //   setTasks((prevTasks) => ({
  //     ...prevTasks,
  //     [day]: [newTask, ...(prevTasks[day] || [])], // Add the new task to the correct day
  //   }));

  //   setNewTaskTitle(""); // Clear the input field

  //   // Save the task to the backend (ensure you send the correct data)
  //   saveTaskToBackend(day, newTask);
  // };
  // const handleAddTask = (e, day) => {
  //   e.preventDefault(); // prevent default behavior (if needed)

  //   if (!newTaskTitle) return; // Avoid adding empty tasks

  //   // Construct the task object without passing the event object
  //   const newTask = {
  //     id: (tasks[day]?.length + 1 || 1).toString(),
  //     title: newTaskTitle, // Ensure this is a string
  //     day: day, // Use day directly (no event object)
  //     activities: decodedActivities, // Ensure decodedActivities is a simple value
  //   };

  //   // Log the new task for debugging
  //   console.log("New Task to Send:", newTask);

  //   // Update the tasks state
  //   setTasks((prevTasks) => ({
  //     ...prevTasks,
  //     [day]: [newTask, ...(prevTasks[day] || [])], // Add the new task to the correct day
  //   }));

  //   setNewTaskTitle(""); // Clear the input field

  //   // Save the task to the backend (ensure you send the correct data)
  //   saveTaskToBackend(day, newTask);
  // };

  // const saveTaskToBackend = async (day, task) => {
  //   try {
  //     // Log the task data to check for any issues
  //     console.log("Task to send:", task);

  //     const taskData = {
  //       title: task.title, // Ensure this matches the backend expected property
  //       day: task.day, // Send day directly
  //       activities: decodedActivities, // Send activities correctly
  //     };

  //     // Log the taskData before sending it to the backend
  //     console.log("Task Data to Backend:", taskData);

  //     const token = localStorage.getItem("jwtToken");

  //     await axios.post(
  //       `${apiUrl}/api/save-task`,
  //       taskData, // Send the taskData with the correct properties
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error saving task:", error);
  //   }
  // };
  const fetchSprintData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiUrl}/api/tasks?activities=${encodeURIComponent(
          decodedActivities
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tasks = response.data.tasks;

      setTasks(tasks); // Load saved tasks from the backend

      // Extract days from the backend tasks and set daysArray
      const uniqueDays = [
        ...new Set(
          tasks.map((task) => new Date(task.day).toLocaleDateString())
        ),
      ];
      setDaysArray(uniqueDays); // Update the days array with unique days from backend
    } catch (error) {
      console.error("Error fetching sprint data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSprint();
    fetchSprintData(); // Fetch tasks data from the backend
  }, [decodedActivities]);

  const handleAddTask = (e, day) => {
    e.preventDefault(); // prevent default behavior (if needed)

    if (!newTaskTitle) return; // Avoid adding empty tasks

    const newTask = {
      id: (tasks[day]?.length + 1 || 1).toString(),
      title: newTaskTitle, // Ensure this is a string
      day: day, // Use day directly (no event object)
      activities: decodedActivities, // Ensure decodedActivities is a simple value
    };

    // Update the tasks state
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: [newTask, ...(prevTasks[day] || [])], // Add the new task to the correct day
    }));

    setNewTaskTitle(""); // Clear the input field

    saveTaskToBackend(day, newTask); // Save the task to the backend
  };

  const saveTaskToBackend = async (day, task) => {
    try {
      const taskData = {
        title: task.title,
        day: task.day,
        activities: decodedActivities,
      };

      const token = localStorage.getItem("jwtToken");

      await axios.post(`${apiUrl}/api/save-task`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Handle adding a new day (input day)
  const handleAddDay = (e) => {
    e.preventDefault();
    const newDay = e.target.value; // Get the value from the input field
    setDaysArray((prevDays) => [...prevDays, newDay]); // Add new day to the list
  };

  return (
    <>
      <body>
        <div className="main-wrapper">
          <TopNav />
          <div
            className="page-wrapper"
            style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
          >
            <div className="content">
              <div className="sprint-container">
                <h2 className="sprint-title">Sprint Board for {activities}</h2>
                <p className="sprint-description">
                  Break down your activities between columns to manage your
                  progress.
                </p>

                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="columns-container">
                    <Droppable droppableId="days" isDropDisabled={true}>
                      {(provided) => (
                        <div
                          className="column"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <h3>Days</h3>
                          {/* Render input for new day */}
                          <input
                            type="text"
                            placeholder="Enter new day"
                            onBlur={handleAddDay} // Trigger adding a day on blur (when the user finishes typing)
                            className="day-input"
                          />
                          {daysArray.map((day, index) => (
                            <div key={index} className="day">
                              {day}
                            </div>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

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
                          <div className="task-input-card">
                            <input
                              type="text"
                              placeholder="Enter task title..."
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              className="task-input"
                            />
                            <button
                              onClick={(e) => handleAddTask(e, daysArray[0])} // Pass the first date from the daysArray
                              className="add-task-btn"
                            >
                              Add Task
                            </button>
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

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
