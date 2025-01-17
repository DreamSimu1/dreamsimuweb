import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAdminModal.css"; // Import the custom CSS file
import { FiChevronDown } from "react-icons/fi";

const Template = ({ showModals, setShowModals, updateTableData }) => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // const fetchAdmins = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/get-manager`);
  //     setManagers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching admins:", error);
  //   }
  // };

  useEffect(() => {
    if (showModals) {
      const fetchManager = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/get-manager`);
          console.log("Fetched points:", response.data);
          setManagers(response.data);
        } catch (error) {
          console.error("Error fetching points:", error);
        }
      };
      fetchManager();
    }
  }, [showModals, apiUrl]);

  // const handleDisbursement = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/disbursements`, {
  //       managerId: selectedManager,
  //       amount,
  //       notes,
  //     });
  //     setMessage(response.data.message);
  //     setSelectedManager("");
  //     setAmount("");
  //     setNotes("");
  //   } catch (error) {
  //     setMessage("Error creating disbursement.");
  //     console.error("Error:", error);
  //   }
  // };

  const handleDisbursement = async (e) => {
    e.preventDefault();

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("jwtToken");
    console.log("Retrieved token:", token);

    try {
      const response = await axios.post(
        `${apiUrl}/api/disbursements`,
        {
          managerId: selectedManager,
          amount,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      setMessage(response.data.message);
      setSelectedManager("");
      setAmount("");
      setNotes("");
    } catch (error) {
      setMessage("Error creating disbursement.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {showModals && <div className="modal-backdrop show"></div>}
      <div
        className={`modal fade ${showModals ? "show modal-enter" : ""}`}
        style={{ display: showModals ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create from template
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModals(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label>
                Create a vision faster with any template of your choice This is
                the first thing you will see when you log in
              </label>
              <br></br>
              <br></br>
              <form onSubmit={handleDisbursement}>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*" // Restricts to image files
                    onChange={(e) => handleImageUpload(e)} // Handle the file selection
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Vision Title</label>
                  <input
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></input>
                </div>
                <br></br>
                {/*}    <div className="form-group">
                  <label>Affirmation</label>
                  <input
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></input>
                </div>
                <br></br>
                <div className="form-group">
                  <label>Vision Statement</label>
                  <textarea
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>*/}

                <div className="form-group">
                  <select
                    className="form-control"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    required
                  >
                    {" "}
                    <option value="" disabled>
                      Top Template
                    </option>
                    <option>Personal Vision</option>
                    <option>Books</option>
                    <option>Health</option>
                    <option>Marriage</option>
                    <option>Career</option>
                    <option>Jobs</option>
                    <option>Financial dream</option>
                  </select>
                </div>
                <br></br>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    required
                  >
                    {" "}
                    <option value="" disabled>
                      Visibility
                    </option>
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn "
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => setShowModals(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
