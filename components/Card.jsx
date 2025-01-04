"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import CardSkeleton from "./CardSkeleton";
import SearchBar from "./Search";

const Card = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState("");

 
  const fetchNotes = async (searchTerm = "") => {
    setLoading(true);
    try {
      // search garako value lai query ma pass garako
      const res = await fetch(`/api/notes?search=${searchTerm}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const { data } = await res.json();
      setNotes(data);
      setFilteredNotes(data); // sabai notes
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // search query bata filter vako notes haru
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetchNotes(searchTerm); 
  };

  useEffect(() => {
    fetchNotes(); 
  }, []);

  //pdf view garda noteid pass gardako views increment garna
  const handleViewPdf =async (noteId,pdfUrl) => {
   try {
        const response = await fetch('/api/notes', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ noteId }),
        });
        const result = await response.json();
        if (result.success) {
            window.open(pdfUrl, '_blank'); 
        } else {
            console.error('Error incrementing views:', result.error);
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
  };


  return (
    <div className="container my-5">
      <SearchBar query={query} onSearch={handleSearch} />
      <h2 className="fw-bold mt-3 mb-4 all-note">All Notes</h2>
      <div className="row justify-content-center ">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : filteredNotes.map((note) => (
              <div
                key={note._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card beautiful-card">
                  <Image
                    src={note.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={note.name}
                    height={40}
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
                        onClick={() => handleViewPdf(note._id, note.pdf)}
                      >
                        View PDF
                      </button>
                      <div className="view-count">
                        <FaEye />
                        <span className="ms-1 text-success fw-bold">
                          {note.views || 0}
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
