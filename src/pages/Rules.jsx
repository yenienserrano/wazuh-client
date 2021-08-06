import React, { useEffect, useState } from "react";
import { RulesTable } from "../components/rules/RulesTable";

export const Rules = () => {
  const [rules, setRules] = useState([]);
  const [offset] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    fetchData();
  }, [offset, limit]);

  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/rules`);
    const data = await res.json();
    setRules(data.data);
  };

  return (
    <div className="p-5">
      <h1 className="text-white">Rules</h1>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Level</th>
            <th scope="col">Description</th>
            <th scope="col">Total alerts</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <RulesTable key={rule.id} rule={rule} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
