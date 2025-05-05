
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Results() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/poll/${pollId}`).then((res) => {
      setPoll(res.data);
    });
  }, [pollId]);

  if (!poll) return <div>Loading...</div>;

  const data = poll.options.map((opt, idx) => ({
    name: opt,
    value: poll.votes[idx],
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Results for: {poll.question}</h2>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
