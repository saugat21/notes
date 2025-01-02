"use client";

import { useState } from "react";

const NoteModal = ({showModal,setShowModal}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    pdf: "",
    tags: "",
  });



  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "my-uploads");

    const cloudinaryURL = `https://api.cloudinary.com/v1_1/dupow8mr1/${type}/upload`;

    try {
      const response = await fetch(cloudinaryURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image if provided
      let imageUrl = "";
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image, "image");
      }

      // Upload PDF if provided
      let pdfUrl = "";
      if (formData.pdf) {
        pdfUrl = await uploadToCloudinary(formData.pdf, "raw");

      }

      // Prepare data to send to the backend
      const noteData = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        pdf: pdfUrl,
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
      };

      // Send the note data to your backend
      const response = await fetch("/api/notes", {
        method: "POST",
        credentials:'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        alert("Note created successfully!");
        setShowModal(false);
       window.location.reload();
      } else {
        alert("Failed to create note.");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };


  return (
    <>
      {showModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Create Note</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <form method="post" onSubmit={handleSubmit} >
                  {/* Name Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      Note Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control rounded-pill shadow-sm"
                      placeholder="Enter note name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Description Field */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control rounded shadow-sm"
                      placeholder="Enter note description"
                      rows="3"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>

                  {/* Image Field */}
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-bold">
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control rounded-pill shadow-sm"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                      }
                    />
                  </div>

                  {/* PDF Field */}
                  <div className="mb-3">
                    <label htmlFor="pdf" className="form-label fw-bold">
                      PDF
                    </label>
                    <input
                      type="file"
                      id="pdf"
                      name="pdf"
                      className="form-control rounded-pill shadow-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, pdf: e.target.files[0] })
                      }
                    />
                  </div>

                  {/* Tags Field */}
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label fw-bold">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      className="form-control rounded-pill shadow-sm"
                      placeholder=" #BCA, #BBA, #CSIT"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill shadow-sm"
                    >
                      Create Note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteModal;
