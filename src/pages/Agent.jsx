import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertDetail } from "../components/alerts/AlertDetail";
import { AlertTable } from "../components/alerts/AlertTable";

export const Agent = () => {
  const [agent, setAgent] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [tenAlerts, setTenAlerts] = useState(null);
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/agents/${id}`);
    const data = await res.json();
    setAgent(data.data);
    setAlerts(data.data.alerts);
    setTenAlerts(data.data.alerts.slice(0, 10));
  };

  const alertDetail = (alert) => {
    setAlert(alert);
    setShow(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1 className="text-white mt-4 mb-4">Agent details</h1>
            <div className="card bg-light  animate__animated animate__fadeIn">
              <div className="card-header"> Agente: {agent.name}</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">Id: {agent.id}</li>
                <li className="list-group-item bg-light">Ip: {agent.ip}</li>
                <li className="list-group-item bg-light">
                  Total alerts: {agent.total_alerts}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <h1 className="text-white mt-4 mb-4">Agent alerts</h1>

            <table className="table table-light table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Rule</th>
                  <th scope="col">Event</th>
                </tr>
              </thead>
              <tbody>
                {alerts &&
                  showMore &&
                  alerts.map((alert) => (
                    <AlertTable
                      key={alert._id}
                      alert={alert}
                      alertDetail={alertDetail}
                    />
                  ))}
                {tenAlerts &&
                  !showMore &&
                  tenAlerts.map((alert) => (
                    <AlertTable
                      key={alert._id}
                      alert={alert}
                      alertDetail={alertDetail}
                    />
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center mb-5">
              {alerts && alerts.length > 10 ? (
                showMore ? (
                  <button
                    className="btn btn-primary-page"
                    onClick={() => setShowMore(false)}
                  >
                    See less
                  </button>
                ) : (
                  <button
                    className="btn btn-primary-page"
                    onClick={() => setShowMore(true)}
                  >
                    See all
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {show && <AlertDetail setShow={setShow} alert={alert} />}
    </>
  );
};
