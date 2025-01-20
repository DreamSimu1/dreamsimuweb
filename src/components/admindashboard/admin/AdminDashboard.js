import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import useFetch from "hooks/useFetch";
import logo from "./oga4.png";
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
const AdminDashboard = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalss, setShowModalss] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const itemsPerPage = 6; // Number of cards per page
  const cards = Array(14).fill({
    title: "Last 30 Days Sales",
    text: "₦ 1,234,567",
    image: news,
  }); // Array of card data (adjust as needed)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visionId, setVisionId] = useState(null);

  useEffect(() => {
    const fetchVisions = async () => {
      try {
        // Get the token from localStorage or a global state
        const token = localStorage.getItem("jwtToken"); // Change this based on your actual method of storing the token

        if (!token) {
          console.error("No authentication token found");
          return;
        }
        console.log("API URL:", `${apiUrl}/api/get-all`);
        console.log("Auth Token:", token);

        // Add token to the headers
        const response = await axios.get(`${apiUrl}/api/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the token to Authorization header
          },
        });
        console.log("Full Response:", response);

        setVisions(response.data); // Assuming the API response contains the visions
      } catch (error) {
        console.error("Error fetching visions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisions();
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Paginate the cards
  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateTableData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/get-all`);
      setVisions(response.data); // Update the visions state with the new list
    } catch (error) {
      console.error("Error fetching updated visions:", error);
    }
  };
  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {/*}  <SideNav />*/}
          <TopNav />

          <div
            class="page-wrapper"
            style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
          >
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

              <div className="vision-board">
                {loading ? (
                  <p>Loading...</p>
                ) : visions.length === 0 ? (
                  <div className="text-center">
                    <p>There is nothing yet on your vision board.</p>
                    <button
                      className="btn btn-primary"
                      // onClick={handleCreateVision}
                      onClick={() => setShowModal(true)}
                    >
                      Create Vision
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {visions.map((vision, index) => (
                      <div
                        key={vision.id}
                        className="col-xl-3 col-sm-6 col-12"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className="card h-100 text-white border-0">
                          <img
                            src={vision.imageUrl || "default-image.jpg"} // Fallback image
                            alt="Card Image"
                            className="card-img-top img-fluid"
                            style={{ objectFit: "cover" }}
                          />
                          <div className="card-body">
                            {/*}   <h3 className="card-title">#{index + 1}</h3>*/}
                            <h3
                              className="card-title"
                              style={{ color: "black" }}
                            >
                              <Link
                                to={`/vision-idea/${encodeURIComponent(
                                  vision.title
                                )}`}
                              >
                                {vision.title}
                              </Link>
                            </h3>
                          </div>
                          {/* Edit and Delete Icons */}
                          <div
                            className="card-icons"
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              display: "none",

                              gap: "10px",
                            }}
                          >
                            <button
                              style={{
                                padding: "8px",
                                fontSize: "16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Edit"
                            >
                              <FaEdit
                                style={{ color: "#28a745" }}
                                onClick={() => {
                                  setVisionId(vision._id);
                                  setShowEditModal(true);
                                }}
                              />
                            </button>
                            <button
                              style={{
                                padding: "8px",
                                fontSize: "16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Delete"
                            >
                              <FaTrash
                                style={{ color: "#dc3545" }}
                                onClick={() => {
                                  setVisionId(vision._id);
                                  setShowModalss(true);
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
        </div>
      </body>
    </div>
  );
};

export default AdminDashboard;
