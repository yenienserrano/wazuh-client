import React, { useEffect, useState } from "react";
import { AlertTable } from "../components/alerts/AlertTable";

export const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, [offset, limit, id]);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/alerts?offset=${offset}&limit=${limit}&id=${id}`
    );
    const data = await res.json();
    setAlerts(data.data);
  };

  const prevPage = () => {
    if (offset <= 9) {
      setOffset(0);
    } else {
      setOffset(offset - +limit);
    }
  };

  const nextPage = () => {
    if (+offset >= 90) {
      setOffset(90);
    } else {
      setOffset(+offset + 10);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-white">Alerts</h1>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Agent</th>
            <th scope="col">Rule</th>
            <th scope="col">Event</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <AlertTable key={alert._id} alert={alert} />
          ))}
        </tbody>
      </table>
      <div className="w-100 d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          {+offset <= 0 ? null : (
            <button className="btn btn-outline-light" onClick={prevPage}>
              Prev
            </button>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {+offset >= 90 ? null : (
            <button className="btn btn-outline-light" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
