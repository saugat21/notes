"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import CardSkeleton from "./CardSkeleton";

const Card = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }
        const { data } = await res.json();
        setNotes(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

//   if (loading) return <p>Loading...</p>;
  const handleViewPdf = (pdfurl) => {
    window.open(pdfurl, "_blank");
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : notes.map((note) => (
              <div
                key={note._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card beautiful-card">
                  <Image
                    src={note.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={note.name}
                    height={20}
                    width={40}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {note.name}
                    </h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {note.description}
                    </p>
                    <div className="mb-4">
                      {Array.isArray(note.tags) ? (
                        note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="tags badge  text-black me-1 fs-6"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-warning">{note.tags}</span>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewPdf(note.pdf)}
                      >
                        View PDF
                      </button>
                      <div className="view-count">
                        <FaEye />
                        <span className="ms-1 text-success fw-bold">
                          {note.viewCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Card;
