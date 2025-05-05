
import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to the Voting App</h1>
      <nav>
        <ul>
          <li><Link to="/create">Create a Poll</Link></li>
        </ul>
      </nav>
    </div>
  );
}
