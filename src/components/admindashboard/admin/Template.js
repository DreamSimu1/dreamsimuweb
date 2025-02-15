import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Template = ({ showModals, setShowModals }) => {
  const [title, setTitle] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]); // Store generated images
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false); // Loading state

  const { user } = useAuth();
  console.log("User from useAuth:", user);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleGenerateVision = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      console.error("User not authenticated or missing _id:", user);
      setMessage("User not authenticated.");
      return;
    }

    const userId = user._id; // Use _id instead of id

    console.log("User ID:", userId); // Debugging step

    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);

    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    setLoading(true); // Start loading

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

      console.log("API Response:", response.data);
      setMessage(response.data.message);
      setGeneratedImages(response.data.dream.imageUrls || []);
    } catch (error) {
      setMessage("Error generating dream.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // Stop loading
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
                <div className="form-group">
                  <label>Upload Image (optional)</label>
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
              {generatedImages.length > 0 && (
                <div className="generated-images">
                  <h5>Generated Visions:</h5>
                  <div className="image-grid">
                    {generatedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Generated Vision ${index + 1}`}
                        style={{ width: "100%", marginTop: "10px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
