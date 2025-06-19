import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import AddNote from "./pages/AddNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import React from 'react';
import EditNote from "./pages/EditNote";

function App() {
  const token = localStorage.getItem("token");

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/" element={token ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={token ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
