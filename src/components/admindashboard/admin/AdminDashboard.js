// import { React, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// import axios from "axios";
// import TopNav from "../TopNav";
// import SideNav from "../SideNav";
// import Sidebars from "../Sidebars";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import moment from "moment";
// import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
// import "./admin.css";
// import { useSidebar } from "../SidebarProvider";
// import news from "./pic.jpeg";
// import CreateIdea from "./CreateIdea";
// import Template from "./Template";
// import CreateVision from "./CreateVision";
// import DeleteVision from "./DeleteVision";
// import EditVision from "./EditVision";
// import VisionBoard from "./VisionBoard";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const AdminDashboard = () => {
//   const { user } = useAuth(); // Access the authenticated user
//   const [points, setPoints] = useState([]);
//   const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
//   const [showModal, setShowModal] = useState(false);
//   const [showModals, setShowModals] = useState(false);
//   const [showModalss, setShowModalss] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [layout, setLayout] = useState([]);
//   const [boardSize, setBoardSize] = useState("2x2");
//   const visionBoardRef = useRef(null);

//   const handlePrint = () => {
//     if (visionBoardRef.current) {
//       const printContents = visionBoardRef.current.innerHTML;
//       const originalContents = document.body.innerHTML;
//       document.body.innerHTML = printContents;
//       window.print();
//       document.body.innerHTML = originalContents;
//       window.location.reload(); // Reload to restore the original page
//     }
//   };

//   const boardOptions = {
//     "2x2": { cols: 2, rows: 2 },
//     "3x3": { cols: 3, rows: 3 },
//     "4x4": { cols: 4, rows: 4 },
//     custom: { cols: 5, rows: 5 },
//   };
//   const { rows, cols } = boardOptions[boardSize];
//   // const handleSizeChange = (size) => {
//   //   setBoardSize(size);
//   //   const { cols, rows } = boardOptions[size];

//   //   // Ensure visions is an array before mapping
//   //   setLayout(
//   //     (visions || []).map((vision, index) => ({
//   //       i: vision.id.toString(),
//   //       x: index % cols,
//   //       y: Math.floor(index / cols),
//   //       w: 1,
//   //       h: 1,
//   //     }))
//   //   );
//   // };
//   // const handleSizeChange = (size) => {
//   //   setBoardSize(size);

//   //   // Make sure layout matches the new board size
//   //   setLayout(
//   //     visions
//   //       .slice(0, boardOptions[size].rows * boardOptions[size].cols)
//   //       .map((vision, index) => ({
//   //         ...vision,
//   //         x: index % boardOptions[size].cols,
//   //         y: Math.floor(index / boardOptions[size].cols),
//   //         w: 1,
//   //         h: 1,
//   //       }))
//   //   );
//   // };

//   // const handleSizeChange = (size) => {
//   //   setBoardSize(size);

//   //   setLayout((prevLayout) => {
//   //     const newLayout = visions.map((vision, index) => {
//   //       const colCount = boardOptions[size].cols;
//   //       return {
//   //         ...vision,
//   //         x: index % colCount,
//   //         y: Math.floor(index / colCount),
//   //         w: 1,
//   //         h: 1,
//   //       };
//   //     });
//   //     setLayout([]);
//   //     return newLayout;
//   //   });
//   // };
//   // const handleSizeChange = (size) => {
//   //   setBoardSize(size);

//   //   setBoardVision((prevBoardVisions) => {
//   //     return prevBoardVisions.map((vision, index) => {
//   //       const colCount = boardOptions[size].cols;
//   //       return {
//   //         ...vision,
//   //         x: index % colCount,
//   //         y: Math.floor(index / colCount),
//   //         w: 1,
//   //         h: 1,
//   //       };
//   //     });
//   //   });
//   // };
//   const handleSizeChange = (size) => {
//     setBoardSize(size);
//   };

//   const apiUrl = process.env.REACT_APP_API_URL;

//   const itemsPerPage = 6; // Number of cards per page
//   const cards = Array(14).fill({
//     title: "Last 30 Days Sales",
//     text: "₦ 1,234,567",
//     image: news,
//   }); // Array of card data (adjust as needed)

//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(cards.length / itemsPerPage);
//   const [visions, setVisions] = useState([]);
//   const [boardvision, setBoardVision] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visionId, setVisionId] = useState(null);

//   useEffect(() => {
//     const fetchVisions = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         if (!token) {
//           console.error("No authentication token found");
//           return;
//         }

//         const userId = user?._id; // Ensure user ID is available

//         // Fetch user-created visions
//         const userVisionsResponse = await axios.get(`${apiUrl}/api/get-all`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Fetch template visions
//         const templateVisionsResponse = await axios.get(
//           `${apiUrl}/api/get-template-visions/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Merge both visions into one state
//         const mergedVisions = [
//           ...userVisionsResponse.data,
//           ...templateVisionsResponse.data,
//         ];

//         setVisions(mergedVisions);
//       } catch (error) {
//         console.error("Error fetching visions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVisions();
//   }, [user]);
//   useEffect(() => {
//     const fetchBoardVisions = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         if (!token) {
//           console.error("No authentication token found");
//           return;
//         }

//         const userId = user?._id; // Ensure user ID is available

//         // Fetch user-created visions
//         const userVisionsResponse = await axios.get(
//           `${apiUrl}/api/get-all-board`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Fetch template visions
//         const templateVisionsResponse = await axios.get(
//           `${apiUrl}/api/get-template-visions-board/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Merge both visions into one state
//         const mergedVisions = [
//           ...userVisionsResponse.data,
//           ...templateVisionsResponse.data,
//         ];

//         setBoardVision(mergedVisions);
//       } catch (error) {
//         console.error("Error fetching visions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBoardVisions();
//   }, [user]);

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   // Paginate the cards
//   const paginatedCards = cards.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const updateTableData = async () => {
//     try {
//       const userId = user._id; // Make sure you have access to the logged-in user's ID
//       const [manualVisionsRes, templateVisionsRes] = await Promise.all([
//         axios.get(`${apiUrl}/api/get-all`),
//         axios.get(`${apiUrl}/api/get-template-visions/${userId}`),
//       ]);

//       // Merge both responses into one array
//       const combinedVisions = [
//         ...manualVisionsRes.data,
//         ...templateVisionsRes.data,
//       ];

//       setVisions(combinedVisions); // Update the state with merged visions
//     } catch (error) {
//       console.error("Error fetching updated visions:", error);
//     }
//   };
//   const updateBoardTableData = async () => {
//     try {
//       const userId = user._id; // Make sure you have access to the logged-in user's ID
//       const [manualVisionsRes, templateVisionsRes] = await Promise.all([
//         axios.get(`${apiUrl}/api/get-all?board=true`),
//         axios.get(`${apiUrl}/api/get-template-visions/${userId}?board=true`),
//       ]);

//       // Merge both responses into one array
//       const combinedVisions = [
//         ...manualVisionsRes.data,
//         ...templateVisionsRes.data,
//       ];

//       setBoardVision(combinedVisions); // Update the state with merged visions
//     } catch (error) {
//       console.error("Error fetching updated visions:", error);
//     }
//   };

//   // const onDragEnd = (result) => {
//   //   const { source, destination } = result;

//   //   if (!destination) return; // If dropped outside, do nothing

//   //   let updatedVisions = [...visions]; // Create a new copy of visions
//   //   let updatedLayout = [...layout]; // Create a new copy of layout

//   //   if (
//   //     source.droppableId === "visions" &&
//   //     destination.droppableId === "board"
//   //   ) {
//   //     const [movedItem] = updatedVisions.splice(source.index, 1); // Remove from visions
//   //     updatedLayout.splice(destination.index, 0, movedItem); // Add to board
//   //     moveToBoard(movedItem._id);
//   //   } else if (
//   //     source.droppableId === "board" &&
//   //     destination.droppableId === "visions"
//   //   ) {
//   //     const [movedItem] = updatedLayout.splice(source.index, 1); // Remove from board
//   //     updatedVisions.push(movedItem); // Add back to visions
//   //   } else if (
//   //     source.droppableId === "visions" &&
//   //     destination.droppableId === "visions"
//   //   ) {
//   //     const [movedItem] = updatedVisions.splice(source.index, 1);
//   //     updatedVisions.splice(destination.index, 0, movedItem);
//   //   } else if (
//   //     source.droppableId === "board" &&
//   //     destination.droppableId === "board"
//   //   ) {
//   //     const [movedItem] = updatedLayout.splice(source.index, 1);
//   //     updatedLayout.splice(destination.index, 0, movedItem);
//   //   }

//   //   setVisions([...updatedVisions]); // Ensure state update triggers re-render
//   //   // setLayout([...updatedLayout]); // Ensure board updates properly
//   //   setBoardVision(updatedBoardVisions);
//   // };

//   // useEffect(() => {
//   //   console.log("Updated Visions:", visions);
//   // }, [visions]);

//   // useEffect(() => {
//   //   console.log("Updated Layout:", layout);
//   // }, [layout]);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) return; // If dropped outside, do nothing

//     let updatedVisions = [...visions]; // Copy of visions
//     let updatedBoardVisions = [...boardvision]; // Copy of boardVision

//     if (
//       source.droppableId === "visions" &&
//       destination.droppableId === "board"
//     ) {
//       const [movedItem] = updatedVisions.splice(source.index, 1); // Remove from visions
//       updatedBoardVisions.splice(destination.index, 0, movedItem); // Add to board
//       moveToBoard(movedItem._id);
//     } else if (
//       source.droppableId === "board" &&
//       destination.droppableId === "visions"
//     ) {
//       const [movedItem] = updatedBoardVisions.splice(source.index, 1);
//       movedItem.board = false; // Remove from board
//       updatedVisions.push(movedItem); // Add back to visions
//     } else if (
//       source.droppableId === "visions" &&
//       destination.droppableId === "visions"
//     ) {
//       const [movedItem] = updatedVisions.splice(source.index, 1);
//       updatedVisions.splice(destination.index, 0, movedItem);
//     } else if (
//       source.droppableId === "board" &&
//       destination.droppableId === "board"
//     ) {
//       const [movedItem] = updatedBoardVisions.splice(source.index, 1);
//       updatedBoardVisions.splice(destination.index, 0, movedItem);
//     }

//     setVisions([...updatedVisions]); // Ensure visions update
//     setBoardVision([...updatedBoardVisions]); // Update board visions correctly
//   };

//   useEffect(() => {
//     console.log("Updated Visions:", visions);
//   }, [visions]);

//   useEffect(() => {
//     console.log("Updated Board Visions:", boardvision);
//   }, [boardvision]);

//   const moveToBoard = async (id) => {
//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       console.error("No authentication token found");
//       return;
//     }
//     try {
//       const response = await fetch(`${apiUrl}/api/move-to-board/${id}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         const updatedVision = visions.find((vision) => vision._id === id);

//         if (updatedVision) {
//           setVisions(visions.filter((vision) => vision._id !== id)); // Remove from list

//           setLayout((prevLayout) => [
//             ...prevLayout,
//             {
//               ...updatedVision,
//               x: prevLayout.length % boardOptions[boardSize].cols,
//               y: Math.floor(prevLayout.length / boardOptions[boardSize].cols),
//               w: 1,
//               h: 1,
//             },
//           ]); // Add to board layout
//         }
//       }
//     } catch (error) {
//       console.error("Error moving vision to board:", error);
//     }
//   };

//   return (
//     <div>
//       <body>
//         <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
//           {/*}  <SideNav />*/}
//           <TopNav />

//           <div
//             class="page-wrapper"
//             style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
//           >
//             <div class="content">
//               <div className="box-container">
//                 {/* First Box */}
//                 <div className="custom-box box-1">
//                   <h2 className="box-title">What is your vision?</h2>
//                   <p className="box-description">
//                     Create a vision board to visualize your goals and dreams
//                   </p>
//                   <button className="btn-vision">
//                     <a onClick={() => setShowModal(true)}>
//                       {" "}
//                       Create Vision Board
//                     </a>
//                   </button>
//                 </div>

//                 {/* Second Box */}
//                 <div className="custom-box box-2">
//                   <h2 className="box-title">Create Vision faster</h2>
//                   <p className="box-description">
//                     Create a vision board faster by trying one of our templates
//                     to start faster
//                   </p>
//                   <button
//                     className="btn-template"
//                     onClick={() => setShowModals(true)}
//                   >
//                     Start with a template
//                   </button>
//                 </div>
//               </div>

//               <div className="vision-board">
//                 {loading ? (
//                   <p>Loading...</p>
//                 ) : visions.length === 0 ? (
//                   <div className="text-center">
//                     <p>There is nothing yet on your vision board.</p>
//                     <button
//                       className="btn btn-primary"
//                       // onClick={handleCreateVision}
//                       onClick={() => setShowModal(true)}
//                     >
//                       Create Vision
//                     </button>
//                   </div>
//                 ) : (
//                   <DragDropContext onDragEnd={onDragEnd}>
//                     <Droppable droppableId="visions" isCombineEnabled={false}>
//                       {(provided) => (
//                         <div
//                           className="row"
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                         >
//                           {visions.map((vision, index) => (
//                             <Draggable
//                               key={
//                                 vision.id
//                                   ? vision.id.toString()
//                                   : `vision-${index}`
//                               }
//                               draggableId={
//                                 vision.id
//                                   ? vision.id.toString()
//                                   : `vision-${index}`
//                               }
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="col-xl-3 col-sm-6 col-12"
//                                   style={{ marginBottom: "20px" }}
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <div className="card h-100 text-white border-0">
//                                     <img
//                                       src={
//                                         vision.imageUrl ||
//                                         (vision.imageUrls &&
//                                         vision.imageUrls.length > 0
//                                           ? vision.imageUrls[0]
//                                           : "default-image.jpg")
//                                       }
//                                       alt="Vision"
//                                       className="card-img-top img-fluid"
//                                       style={{
//                                         objectFit: "cover",
//                                         width: "100%",
//                                         height: "250px",
//                                       }}
//                                     />
//                                     <div className="card-body">
//                                       {/*}   <h3 className="card-title">#{index + 1}</h3>*/}
//                                       <h3
//                                         className="card-title"
//                                         style={{ color: "black" }}
//                                       >
//                                         <Link
//                                           to={`/vision-idea/${encodeURIComponent(
//                                             vision.title
//                                           )}`}
//                                         >
//                                           {vision.title}
//                                         </Link>
//                                       </h3>
//                                     </div>
//                                     <div
//                                       className="card-icons"
//                                       style={{
//                                         position: "absolute",
//                                         top: "10px",
//                                         right: "10px",
//                                         display: "none",

//                                         gap: "10px",
//                                       }}
//                                     >
//                                       <button
//                                         style={{
//                                           padding: "8px",
//                                           fontSize: "16px",
//                                           backgroundColor: "#fff",
//                                           border: "1px solid #ddd",
//                                           borderRadius: "4px",
//                                           cursor: "pointer",
//                                         }}
//                                         title="Edit"
//                                       >
//                                         <FaEdit
//                                           style={{ color: "#28a745" }}
//                                           onClick={() => {
//                                             setVisionId(vision._id);
//                                             setShowEditModal(true);
//                                           }}
//                                         />
//                                       </button>
//                                       <button
//                                         style={{
//                                           padding: "8px",
//                                           fontSize: "16px",
//                                           backgroundColor: "#fff",
//                                           border: "1px solid #ddd",
//                                           borderRadius: "4px",
//                                           cursor: "pointer",
//                                         }}
//                                         title="Delete"
//                                       >
//                                         <FaTrash
//                                           style={{ color: "#dc3545" }}
//                                           onClick={() => {
//                                             setVisionId(vision._id);
//                                             setShowModalss(true);
//                                           }}
//                                         />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                           {provided.placeholder}
//                         </div>
//                       )}
//                     </Droppable>

//                     <label>Select Board Size:</label>
//                     <select
//                       onChange={(e) => handleSizeChange(e.target.value)}
//                       value={boardSize}
//                     >
//                       {Object.keys(boardOptions).map((option) => (
//                         <option key={option} value={option}>
//                           {option.toUpperCase()}
//                         </option>
//                       ))}
//                     </select>

//                     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//                       {/* Header */}
//                       <button onClick={handlePrint}>Print Vision Board</button>
//                       <div ref={visionBoardRef} className="vision-board">
//                         <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
//                           My Vision Board
//                         </h1>

//                         {/* Print Button */}

//                         <Droppable droppableId="board">
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.droppableProps}
//                               style={{
//                                 display: "grid",
//                                 gridTemplateRows: `repeat(${rows}, 200px)`,
//                                 gridTemplateColumns: `repeat(${cols}, 200px)`,
//                                 gap: "10px",
//                                 backgroundColor: "#dc3545",
//                                 border: "2px solid black",
//                                 width: `${cols * 210}px`,
//                                 height: `${rows * 210}px`,
//                                 overflow: "hidden", // Prevent nested scrolling issue
//                               }}
//                             >
//                               {boardvision.map((vision, index) => (
//                                 <Draggable
//                                   key={vision.id || `vision-${index}`}
//                                   draggableId={
//                                     vision.id
//                                       ? vision.id.toString()
//                                       : `vision-${index}`
//                                   }
//                                   index={index}
//                                 >
//                                   {(provided) => (
//                                     <div
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       className="border border-gray-300 flex items-center justify-center"
//                                       style={{
//                                         width: "200px",
//                                         height: "200px",
//                                         backgroundColor: "#fff",
//                                         position: "relative",
//                                       }}
//                                     >
//                                       <img
//                                         src={
//                                           vision.imageUrl ||
//                                           (vision.imageUrls &&
//                                           vision.imageUrls.length > 0
//                                             ? vision.imageUrls[0]
//                                             : "default-image.jpg")
//                                         }
//                                         alt="Vision"
//                                         style={{
//                                           width: "100%",
//                                           height: "100%",
//                                           objectFit: "cover",
//                                         }}
//                                       />
//                                     </div>
//                                   )}
//                                 </Draggable>
//                               ))}
//                               {provided.placeholder}
//                             </div>
//                           )}
//                         </Droppable>
//                       </div>
//                     </div>
//                   </DragDropContext>
//                 )}

//                 {/*}  <div
//                   className="grid gap-2 border p-2"
//                   style={{
//                     backgroundColor: "#dc3545",
//                     display: "grid",
//                     gridTemplateRows: `repeat(${rows}, 200px)`,
//                     gridTemplateColumns: `repeat(${cols}, 200px)`,
//                     border: "2px solid black",
//                     width: `${cols * 210}px`,
//                     height: `${rows * 210}px`,
//                   }}
//                 >
//                   {[...Array(rows * cols)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="border border-gray-300 flex items-center justify-center"
//                     >

//                     </div>
//                   ))}
//                 </div>*/}

//                 <DeleteVision
//                   showModalss={showModalss}
//                   setShowModalss={setShowModalss}
//                   updateTableData={updateTableData}
//                   visionId={visionId}
//                 />
//                 <EditVision
//                   showEditModal={showEditModal}
//                   setShowEditModal={setShowEditModal}
//                   updateTableData={updateTableData}
//                   visionId={visionId}
//                 />
//                 <CreateVision
//                   showModal={showModal}
//                   setShowModal={setShowModal}
//                   updateTableData={updateTableData}
//                 />
//                 <Template
//                   showModals={showModals}
//                   setShowModals={setShowModals}
//                   updateTableData={updateTableData}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </div>
//   );
// };

// export default AdminDashboard;

import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import Sidebars from "../Sidebars";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "./admin.css";
import { useSidebar } from "../SidebarProvider";
import news from "./pic.jpeg";
import CreateIdea from "./CreateIdea";
import Template from "./Template";
import CreateVision from "./CreateVision";
import DeleteVision from "./DeleteVision";
import EditVision from "./EditVision";
import VisionBoard from "./VisionBoard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [visions, setVisions] = useState([]);
  const [boardVisions, setBoardVisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [boardvision, setBoardVision] = useState([]);
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalss, setShowModalss] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [layout, setLayout] = useState([]);
  const [visionId, setVisionId] = useState(null);

  const [boardSize, setBoardSize] = useState("3x3");
  const visionBoardRef = useRef(null);

  const handlePrint = () => {
    if (visionBoardRef.current) {
      const printContents = visionBoardRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore the original page
    }
  };
  const boardOptions = {
    "2x2": { cols: 2, rows: 2 },
    "3x3": { cols: 3, rows: 3 },
    "4x4": { cols: 4, rows: 4 },
    custom: { cols: 5, rows: 5 },
  };
  const { rows, cols } = boardOptions[boardSize];
  const handleSizeChange = (size) => {
    setBoardSize(size);
    const { cols, rows } = boardOptions[size];

    // Ensure visions is an array before mapping
    setLayout(
      (visions || []).map((vision, index) => ({
        i: vision.id.toString(),
        x: index % cols,
        y: Math.floor(index / cols),
        w: 1,
        h: 1,
      }))
    );
  };
  // Fetch available visions (from API)
  useEffect(() => {
    const fetchVisions = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const userId = user?._id; // Ensure user ID is available

        // Fetch user-created visions
        const userVisionsResponse = await axios.get(`${apiUrl}/api/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch template visions
        const templateVisionsResponse = await axios.get(
          `${apiUrl}/api/get-template-visions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Merge both visions
        setVisions([
          ...userVisionsResponse.data,
          ...templateVisionsResponse.data,
        ]);
      } catch (error) {
        console.error("Error fetching visions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisions();
  }, [user]);

  // Fetch visions already on the board
  useEffect(() => {
    const fetchBoardVisions = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const userId = user?._id;

        // Fetch visions on the board
        const userVisionsResponse = await axios.get(
          `${apiUrl}/api/get-all-board`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch template visions on board
        const templateVisionsResponse = await axios.get(
          `${apiUrl}/api/get-template-visions-board/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Merge both board visions
        setBoardVisions([
          ...userVisionsResponse.data,
          ...templateVisionsResponse.data,
        ]);
      } catch (error) {
        console.error("Error fetching visions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardVisions();
  }, [user]);

  // Handle Drag-and-Drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Ignore invalid drops

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      return; // No need to update the database if staying in the same list
    }

    const updatedVisions = [...visions];
    const updatedBoardVisions = [...boardVisions];

    let movedItem;

    if (source.droppableId === "visionsList") {
      movedItem = updatedVisions.splice(source.index, 1)[0];
      updatedBoardVisions.splice(destination.index, 0, movedItem);
      // await moveToBoard(movedItem._id);
      await moveToBoard(movedItem);
    } else {
      movedItem = updatedBoardVisions.splice(source.index, 1)[0];
      updatedVisions.splice(destination.index, 0, movedItem);
      await removeFromBoard(movedItem._id); // Update database
    }

    setVisions(updatedVisions);
    setBoardVisions(updatedBoardVisions);
  };

  // const moveToBoard = async (id) => {
  //   const token = localStorage.getItem("jwtToken");
  //   if (!token) {
  //     console.error("No authentication token found");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${apiUrl}/api/move-to-board/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ board: true }),
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to update vision to board");
  //     }
  //   } catch (error) {
  //     console.error("Error moving vision to board:", error);
  //   }
  // };
  const moveToBoard = async (vision) => {
    if (!vision || !vision._id) {
      console.error("Invalid vision object, missing _id");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    // Use the appropriate endpoint based on `vision.imageUrls?.[0]`
    const endpoint = vision.imageUrls?.[0]
      ? "move-to-board-template"
      : "move-to-board";

    try {
      const response = await fetch(`${apiUrl}/api/${endpoint}/${vision._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: true }),
      });

      if (!response.ok) {
        console.error("Failed to update vision to board");
      }
    } catch (error) {
      console.error("Error moving vision to board:", error);
    }
  };

  // const moveToBoard = async (vision) => {
  //   if (!vision || !vision._id) {
  //     console.error("Invalid vision object, missing _id");
  //     return;
  //   }

  //   const token = localStorage.getItem("jwtToken");
  //   if (!token) {
  //     console.error("No authentication token found");
  //     return;
  //   }

  //   const endpoint = vision.imageUrls?.[0]
  //     ? "move-to-board-template"
  //     : "move-to-board";

  //   try {
  //     const response = await fetch(`${apiUrl}/api/${endpoint}/${vision._id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ board: true }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Failed to update vision to board:", errorData.message);
  //     } else {
  //       const data = await response.json();
  //       console.log("Success:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error moving vision to board:", error);
  //   }
  // };

  const removeFromBoard = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/move-to-board/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: false }),
      });

      if (!response.ok) {
        console.error("Failed to update vision back to available");
      }
    } catch (error) {
      console.error("Error removing vision from board:", error);
    }
  };

  const updateTableData = async () => {
    try {
      const userId = user._id; // Make sure you have access to the logged-in user's ID
      const [manualVisionsRes, templateVisionsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/get-all`),
        axios.get(`${apiUrl}/api/get-template-visions/${userId}`),
      ]);

      // Merge both responses into one array
      const combinedVisions = [
        ...manualVisionsRes.data,
        ...templateVisionsRes.data,
      ];

      setVisions(combinedVisions); // Update the state with merged visions
    } catch (error) {
      console.error("Error fetching updated visions:", error);
    }
  };
  const updateBoardTableData = async () => {
    try {
      const userId = user._id; // Make sure you have access to the logged-in user's ID
      const [manualVisionsRes, templateVisionsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/get-all?board=true`),
        axios.get(`${apiUrl}/api/get-template-visions/${userId}?board=true`),
      ]);

      // Merge both responses into one array
      const combinedVisions = [
        ...manualVisionsRes.data,
        ...templateVisionsRes.data,
      ];

      setBoardVision(combinedVisions); // Update the state with merged visions
    } catch (error) {
      console.error("Error fetching updated visions:", error);
    }
  };
  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <SideNav />
          <TopNav />

          <div class="page-wrapper" style={{ marginBottom: "100px" }}>
            <div class="content">
              <div className="box-container">
                {/* First Box */}
                <div className="custom-box box-1">
                  <h2 className="box-title">What is your vision?</h2>
                  <p className="box-description">
                    Create a vision board to visualize your goals and dreams
                  </p>
                  <button className="btn-vision">
                    <a onClick={() => setShowModal(true)}>
                      {" "}
                      Create Vision Board
                    </a>
                  </button>
                </div>

                {/* Second Box */}
                <div className="custom-box box-2">
                  <h2 className="box-title">Create Vision faster</h2>
                  <p className="box-description">
                    Create a vision board faster by trying one of our templates
                    to start faster
                  </p>
                  <button
                    className="btn-template"
                    onClick={() => setShowModals(true)}
                  >
                    Start with a template
                  </button>
                </div>
              </div>

              {loading ? (
                <p>Loading visions...</p>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="flex gap-6">
                    {/* Available Visions List */}
                    <Droppable droppableId="visionsList">
                      {(provided) => (
                        <div
                          className="row g-4" // Added gap between grid items
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {visions.map((vision, index) => (
                            <Draggable
                              key={vision._id}
                              draggableId={vision._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="col-xl-3 col-md-4 col-sm-6 col-12"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className="card vision-card"
                                    style={{
                                      position: "relative",
                                      border: "none",
                                      borderRadius: "12px",
                                      overflow: "hidden",
                                      transition: "0.3s",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <img
                                      // src={vision.imageUrl}
                                      src={
                                        vision.imageUrls?.[0] || vision.imageUrl
                                      }
                                      alt={vision.text}
                                      className="card-img-top img-fluid"
                                      style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "250px",
                                      }}
                                    />

                                    <div className="card-body">
                                      <h3 className="card-title text-dark">
                                        <Link
                                          to={`/vision-idea/${encodeURIComponent(
                                            vision.title
                                          )}`}
                                          style={{
                                            textDecoration: "none",
                                            color: "black",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {vision.title}
                                        </Link>
                                      </h3>
                                    </div>

                                    {/* Hover Icons */}
                                    <div
                                      className="card-icons"
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        display: "flex",
                                        gap: "8px",
                                        opacity: "0",
                                        transition: "opacity 0.3s ease-in-out",
                                      }}
                                    >
                                      <button
                                        className="icon-btn"
                                        title="Edit"
                                        onClick={() => {
                                          // setVisionId(vision._id);
                                          setShowEditModal(true);
                                        }}
                                      >
                                        <FaEdit style={{ color: "#28a745" }} />
                                      </button>
                                      <button
                                        className="icon-btn"
                                        title="Delete"
                                        onClick={() => {
                                          // setVisionId(vision._id);
                                          setShowModalss(true);
                                        }}
                                      >
                                        <FaTrash style={{ color: "#dc3545" }} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <label>Select Board Size:</label>
                    <select
                      onChange={(e) => handleSizeChange(e.target.value)}
                      value={boardSize}
                    >
                      {Object.keys(boardOptions).map((option) => (
                        <option key={option} value={option}>
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
                      {/* Header */}
                      <button onClick={handlePrint}>Print Vision Board</button>
                      <div ref={visionBoardRef} className="vision-board">
                        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
                          My Vision Board
                        </h1>
                        {/* Vision Board */}
                        <Droppable droppableId="visionBoard">
                          {(provided) => (
                            <div
                              // className="bg-white p-4 rounded-lg shadow-md w-64"
                              style={{
                                display: "grid",
                                gridTemplateRows: `repeat(${rows}, 200px)`,
                                gridTemplateColumns: `repeat(${cols}, 200px)`,
                                gap: "10px",
                                backgroundColor: "#dc3545",
                                border: "2px solid black",
                                width: `${cols * 210}px`,
                                height: `${rows * 210}px`,
                                overflow: "hidden", // Prevent nested scrolling issue
                              }}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {boardVisions.map((vision, index) => (
                                <Draggable
                                  key={vision._id}
                                  draggableId={vision._id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      className="border border-gray-300 flex items-center justify-center"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        backgroundColor: "#fff",
                                        position: "relative",
                                      }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <img
                                        src={
                                          vision.imageUrl ||
                                          (vision.imageUrls &&
                                          vision.imageUrls.length > 0
                                            ? vision.imageUrls[0]
                                            : "default-image.jpg")
                                        }
                                        alt={vision.text}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  </div>
                </DragDropContext>
              )}
              <DeleteVision
                showModalss={showModalss}
                setShowModalss={setShowModalss}
                updateTableData={updateTableData}
                visionId={visionId}
              />
              <EditVision
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                updateTableData={updateTableData}
                visionId={visionId}
              />
              <CreateVision
                showModal={showModal}
                setShowModal={setShowModal}
                updateTableData={updateTableData}
              />
              <Template
                showModals={showModals}
                setShowModals={setShowModals}
                updateTableData={updateTableData}
              />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AdminDashboard;
