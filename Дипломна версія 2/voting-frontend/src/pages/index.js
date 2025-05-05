
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreatePoll from "./CreatePoll";
import Vote from "./Vote";
import Results from "./Results";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreatePoll />} />
      <Route path="/vote/:pollId" element={<Vote />} />
      <Route path="/results/:pollId" element={<Results />} />
    </Routes>
  </BrowserRouter>
);
