
import React, { useState } from "react";
import axios from "axios";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/create_poll", {
      question,
      options,
    });
    alert("Poll created! Share this ID: " + response.data.poll_id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label><br />
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((opt, idx) => (
            <div key={idx}>
              <input
                value={opt}
                onChange={(e) =>
                  setOptions(options.map((o, i) => (i === idx ? e.target.value : o)))
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => setOptions([...options, ""])}>Add Option</button>
        </div>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}
