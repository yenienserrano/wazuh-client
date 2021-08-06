import React, { useEffect, useState } from "react";
import { AgentsTable } from "../components/agents/AgentsTable";

export const Agents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/agents`);
    const data = await res.json();
    setAgents(data.data);
  };

  return (
    <div className="p-5">
      <h1 className="text-white">Agents</h1>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">name</th>
            <th scope="col">ip</th>
            <th scope="col">Total alerts</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => (
            <AgentsTable key={i} agent={agent} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
