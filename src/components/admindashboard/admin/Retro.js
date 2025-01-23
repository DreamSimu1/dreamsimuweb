import React, { useState } from "react";
import axios from "axios";
import "./CreateVision.css";
import { FiChevronDown } from "react-icons/fi";
import TopNav from "../TopNav";

const Retro = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {};

  return (
    <>
      <div className="main-wrapper">
        <TopNav />
        <div className="page-wrapper adad">
          <div className="content">
            <div
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Retrospect
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <br />
                      <div className="form-group">
                        <label>What went well</label>
                        <textarea className="form-control" required></textarea>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>What were the challenges</label>
                        <textarea className="form-control" required></textarea>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>What can be improved</label>
                        <textarea className="form-control" required></textarea>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Attach Note/Media (Optional)</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>

                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Retro;
