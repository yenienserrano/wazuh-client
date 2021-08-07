import React from "react";
import { useHistory } from "react-router-dom";

export const RulesTable = ({ rule }) => {
  const history = useHistory();
  return (
    <tr
      className="pointer animate__animated animate__fadeIn"
      onClick={() => history.push(`/rules/${rule.id}`)}
    >
      <td>{rule.id}</td>
      <td>{rule.level}</td>
      <td>{rule.description}</td>
      <td>{rule.total_alerts}</td>
    </tr>
  );
};
