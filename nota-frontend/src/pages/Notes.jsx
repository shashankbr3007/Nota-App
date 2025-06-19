import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await api.get("/notes");
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await api.delete(`/notes/${id}`);
                setNotes((prev) => prev.filter((note) => note.id !== id));
            } catch (error) {
                console.error("Failed to delete note:", error);
            }
        }
    };

    const handleEdit = (note) => {
        navigate(`/edit/${note.id}`, { state: note });
    };

    const handleAdd = () => {
        navigate("/add");
    };

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <h2>📒 Your Notes</h2>
                <button
                    onClick={handleAdd}
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    ➕ Add New Note
                </button>
            </div>

            {notes.length === 0 ? (
                <p style={{ textAlign: "center" }}>No notes available.</p>
            ) : (
                notes.map((note) => (
                    <div
                        key={note.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "16px",
                            marginBottom: "16px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                            backgroundColor: "#fefefe",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        <h3 style={{ margin: "0 0 8px" }}>{note.title}</h3>
                        <p style={{ margin: 0 }}>{note.content}</p>
                        <small style={{ color: "#666" }}>Note ID: {note.id}</small>
                        <div style={{ marginTop: "10px" }}>
                            <button
                                onClick={() => handleEdit(note)}
                                style={{
                                    backgroundColor: "#2196F3",
                                    color: "white",
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "4px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => handleDelete(note.id)}
                                style={{
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notes;
