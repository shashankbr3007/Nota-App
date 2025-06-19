// src/pages/EditNote.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: "", content: "" });

    // Load existing note
    useEffect(() => {
        const loadNote = async () => {
            try {
                const res = await api.get(`/note/${id}`);
                setNote(res.data);
            } catch (err) {
                toast.error("Failed to load note");
            }
        };
        loadNote();
    }, [id]);

    // Submit the update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/notes/${id}`, note); // ✅ Use PUT here
            toast.success("Note updated successfully");
            navigate("/");
        } catch (err) {
            toast.error("Failed to update note");
        }
    };

    return (
        <div className="container">
            <h2>Edit Note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        rows="5"
                        required
                    />
                </div>
                <button type="submit">Update Note</button>
                <button type="button" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
}

export default EditNote;
