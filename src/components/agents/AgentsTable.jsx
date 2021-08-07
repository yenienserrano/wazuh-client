import React from "react";
import { useHistory } from "react-router-dom";

export const AgentsTable = ({ agent }) => {
  const history = useHistory();

  return (
    <tr
      className="pointer animate__animated animate__fadeIn"
      onClick={() => history.push(`/agents/${agent.id}`)}
    >
      <td>{agent.id}</td>
      <td>{agent.name}</td>
      <td>{agent.ip}</td>
      <td>{agent.total_alerts}</td>
    </tr>
  );
};
