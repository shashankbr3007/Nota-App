import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AddNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/notes", { title, content });
            toast.success("Note added successfully!");
            navigate("/notes");
        } catch (error) {
            toast.error("Failed to add note!");
            console.error("Add note error:", error);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <h2>Add New Note</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    ➕ Create Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
