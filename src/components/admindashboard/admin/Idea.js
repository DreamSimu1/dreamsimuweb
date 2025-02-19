import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useSidebar } from "../SidebarProvider";
import TopNav from "../TopNav";
import news from "./pic.jpeg";
import CreateIdea from "./CreateIdea";
import DeleteIdea from "./DeleteIdea";
import EditIdea from "./EditIdea";

const Idea = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [ideas, setIdeas] = useState([]);
  const { isSidebarOpen } = useSidebar(); // Sidebar state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalss, setShowModalss] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [milestonePlan, setMilestonePlan] = useState(null);
  const [loadingMilestone, setLoadingMilestone] = useState(true);

  const { title } = useParams(); // Get title from URL params
  const decodedTitle = decodeURIComponent(title); // Decode the title to restore spaces
  console.log(decodedTitle);
  const [showModalsss, setShowModalsss] = useState(false);
  console.log("Raw title from URL params:", title);
  console.log("Decoded title:", decodedTitle);
  const itemsPerPage = 6; // Number of cards per page
  const cards = Array(14).fill({
    title: "Last 30 Days Sales",
    text: "₦ 1,234,567",
    image: news,
  }); // Example card data

  const totalPages = Math.ceil(cards.length / itemsPerPage); // Calculate total pages

  // const [visions, setVisions] = useState([]);
  // const apiUrl = process.env.REACT_APP_API_URL;
  // const [currentPage, setCurrentPage] = useState(1); // Start with the first page

  const [loading, setLoading] = useState(true);
  const [ideaId, setIdeaId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [currentPage, setCurrentPage] = useState(1); // Start with the first page
  const [visions, setVisions] = useState([]);
  const [manualEntries, setManualEntries] = useState(Array(7).fill(""));
  const handleInputChange = (index, value) => {
    const updatedEntries = [...manualEntries];
    updatedEntries[index] = value;
    setManualEntries(updatedEntries);
  };

  const addNewEntry = () => {
    setManualEntries([...manualEntries, ""]);
  };
  const [visionId, setVisionId] = useState(null);

  // const fetchVisionAndIdeas = async () => {
  //   try {
  //     // Use the title as is with spaces, encoding is done by `encodeURIComponent`
  //     const encodedTitle = encodeURIComponent(title);

  //     // Fetch the vision by title
  //     const visionResponse = await axios.get(
  //       `${apiUrl}/api/get-single-by-title/${encodedTitle}`
  //     );
  //     const visionId = visionResponse.data._id; // Get the visionId
  //     setVisionId(visionId); // Set the visionId

  //     // Fetch ideas for this vision
  //     const ideasResponse = await axios.get(`${apiUrl}/api/ideas/${visionId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //       },
  //     });

  //     setIdeas(ideasResponse.data.ideas); // Set the ideas data
  //     setLoading(false); // Stop loading
  //   } catch (error) {
  //     console.error("Error fetching vision or ideas:", error);
  //     setLoading(false);
  //   }
  // };
  const fetchVisionAndIdeas = async () => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const visionResponse = await axios.get(
        `${apiUrl}/api/get-single-by-title/${encodedTitle}`
      );

      if (!visionResponse.data?._id) {
        console.error("Error: Vision ID not found in response");
        alert("Could not find vision ID");
        return;
      }

      setVisionId(visionResponse.data._id); // Ensure it's set before saving
      console.log("Raw title from URL params:", title);
      console.log("Decoded title:", decodedTitle);
    } catch (error) {
      console.error(
        "Error fetching vision or ideas:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchVisionAndIdeas(decodedTitle); // Pass decodedTitle to your function
  }, [decodedTitle]);

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

  const handleSavePlan = async () => {
    try {
      const entriesToSave = manualEntries.map((idea, index) => ({
        day: index + 1,
        idea,
        visionId,
      }));

      await axios.post(`${apiUrl}/api/create-plan`, { entries: entriesToSave });

      alert("Milestone Plan Saved Successfully!");
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save milestone plan.");
    }
  };

  const updateTableData = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.get(`${apiUrl}/api/ideas/${visionId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization header
        },
      });

      setIdeas(response.data.ideas); // Update the ideas state with the new list
    } catch (error) {
      console.error("Error fetching updated ideas:", error);
    }
  };

  useEffect(() => {
    const fetchMilestonePlan = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/generate-plan/${decodedTitle}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        setMilestonePlan(response.data.milestones);
      } catch (error) {
        console.error("Error fetching milestone plan:", error);
      } finally {
        setLoadingMilestone(false);
      }
    };

    fetchMilestonePlan();
  }, [decodedTitle]);

  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <TopNav />

          <div className="page-wrapper  adad">
            <div className="content">
              <div className="content">
                <h2>Milestone Plan for {decodedTitle}</h2>
                {loadingMilestone ? (
                  <p>Loading milestone plan...</p>
                ) : milestonePlan ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Milestone</th>
                        <th>Timeframe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestonePlan.split("\n").map((step, index) => {
                        const match = step.match(/^(.*?)\s*\(([^)]+)\)$/); // Extract milestone and timeframe
                        if (match) {
                          return (
                            <tr key={index}>
                              <td>{match[1]}</td>
                              <td>{match[2]}</td>
                            </tr>
                          );
                        }
                        return null; // Skip if format is incorrect
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>No milestone plan available.</p>
                )}
              </div>

              <h3>Plan Your Days</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Idea</th>
                  </tr>
                </thead>
                <tbody>
                  {manualEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>Day {index + 1}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={entry}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder="Type your idea here"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={addNewEntry}
              style={{
                backgroundColor: "#28a745",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                color: "white",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Add Another Day
            </button>
            <button
              onClick={handleSavePlan}
              style={{
                backgroundColor: "#0d3978",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                color: "white",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Save Milestone Plan
            </button>

            <DeleteIdea
              showModalss={showModalss}
              setShowModalss={setShowModalss}
              updateTableData={updateTableData}
              ideaId={ideaId}
            />
            <EditIdea
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              updateTableData={updateTableData}
              ideaId={ideaId}
            />
            <CreateIdea
              showModalsss={showModalsss}
              setShowModalsss={setShowModalsss}
              updateTableData={updateTableData}
              visionId={visionId} // Assuming all ideas belong to the same vision
            />
          </div>
        </div>
      </body>
    </div>
  );
};

export default Idea;
