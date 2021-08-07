import React from "react";

export const AlertTable = ({ alert, alertDetail }) => {
  return (
    <tr
      className="pointer animate__animated animate__fadeIn"
      onClick={() => alertDetail(alert)}
    >
      <td>{alert._id}</td>
      <td>{alert._source.agent.name}</td>
      <td>{alert._source.rule.id}</td>
      <td>{alert._source.syscheck.event}</td>
    </tr>
  );
};
