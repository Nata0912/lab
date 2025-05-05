
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Vote() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/poll/${pollId}`).then((res) => {
      setPoll(res.data);
    });
  }, [pollId]);

  const handleVote = async () => {
    await axios.post(`http://localhost:8000/vote/${pollId}`, {
      option_index: selected,
    });
    alert("Vote submitted!");
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{poll.question}</h2>
      {poll.options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name="vote"
              value={idx}
              onChange={() => setSelected(idx)}
            />
            {opt}
          </label>
        </div>
      ))}
      <button onClick={handleVote} disabled={selected === null}>Submit Vote</button>
    </div>
  );
}
