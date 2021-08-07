import React, { useEffect, useState } from "react";
import { GraficD3 } from "../components/dashboard/GraficD3";

export const Dashboard = () => {
  const [agents, setAgents] = useState(null);
  const [rules, setRules] = useState(null);

  useEffect(() => {
    getAllAgents();
    getAllRules();
    // eslint-disable-next-line
  }, []);
  const getAllAgents = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/agents`);
    const data = await res.json();
    setAgents(data.data);
  };

  const getAllRules = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/rules`);
    const data = await res.json();
    setRules(data.data);
  };

  return (
    <div className="text-center">
      <h1 className="text-white mt-3 mb-3">Dashboard</h1>
      <div className="container">
        <div className="row">
          {agents && (
            <div className="col-md-6 d-flex flex-column align-items-center animate__animated animate__fadeIn">
              <h1 className="text-white">Agents alerts</h1>
              <GraficD3 data={agents} />
              <p className="text-white mt-3">
                The number of alerts is reflected on the Y axis and the agent
                id's on the X axis
              </p>
            </div>
          )}
          {rules && (
            <div className="col-md-6 d-flex flex-column align-items-center animate__animated animate__fadeIn">
              <h1 className="text-white">Rules alerts</h1>
              <GraficD3 data={rules} />
              <p className="text-white mt-3">
                The number of alerts is reflected on the Y axis and the rules
                id's on the X axis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
