import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Template = ({ showModals, setShowModals, updateTableData }) => {
  const [title, setTitle] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]); // Store generated images
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedVision, setSelectedVision] = useState(null);

  const handleSelectVision = (imageUrl) => {
    setSelectedVision(imageUrl);
  };

  const { user } = useAuth();
  console.log("User from useAuth:", user);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const [imageUrl, setImageUrl] = useState(null);

  const handleGenerateVision = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user._id) {
      setMessage("User not authenticated.");
      setLoading(false);
      return;
    }

    const userId = user._id;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/generate-dream`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      const data = response.data;
      console.log("API Response:", data); // Log the response to check for errors

      if (data.imagePath) {
        setGeneratedImages([data.imagePath]); // Ensure it updates correctly
      } else {
        setMessage("Failed to generate vision.");
      }
    } catch (error) {
      console.error("Error generating vision:", error);
      setMessage("Error generating vision.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVision = async () => {
    console.log("save button is clicked");
    if (!selectedVision) {
      setMessage("Please select a vision to save.");
      return;
    }

    if (!title.trim()) {
      setMessage("Title cannot be empty.");
      return;
    }

    if (!user || !user._id) {
      setMessage("User not authenticated.");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/api/create-template-vision`,
        {
          title: title.trim(), // Ensure title is not empty
          imageUrl: selectedVision,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setMessage("Vision saved successfully!");
      setShowModals(false); // Close modal after saving
      await updateTableData(); // Wait for the table to update
      // if (updateTableData) {
      //   updateTableData(); // Refresh the visions list
      // }
    } catch (error) {
      console.error(
        "Error saving vision:",
        error.response?.data || error.message
      );
      setMessage(error.response?.data?.error || "Error saving vision.");
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
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Create from Template (Dream Visualizer)
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
              <form onSubmit={handleGenerateVision}>
                <div className="form-group">
                  <label>Describe Your Dream</label>
                  <textarea
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></textarea>
                </div>
                {/*} <div className="form-group">
                  <label>Upload Image (optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>*/}
                <div className="form-group">
                  <label>Upload Your Image (Swap Image)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Generating...
                      </>
                    ) : (
                      "Generate Vision"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowModals(false)}
                    disabled={loading}
                  >
                    Close
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}

              {/* Display Generated Images */}

              {/* Display Generated Images */}
              {generatedImages.length > 0 && (
                <div className="generated-images">
                  <h5>Generated Visions:</h5>
                  <div className="image-grid">
                    {generatedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Generated Vision ${index + 1}`}
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          border:
                            selectedVision === image
                              ? "3px solid blue"
                              : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectVision(image)}
                        onError={(e) =>
                          console.error("Image failed to load:", image)
                        } // Debugging
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                className="btn btn-danger"
                onClick={handleSaveVision}
                disabled={!selectedVision}
              >
                Save Selected Vision
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
