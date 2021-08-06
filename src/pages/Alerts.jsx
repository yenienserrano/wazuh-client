import React, { useEffect, useState } from "react";
import { AlertDetail } from "../components/alerts/AlertDetail";
import { AlertTable } from "../components/alerts/AlertTable";

export const Alerts = () => {
  const [allAlerts, setAllAlerts] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchAllAlerts();
  }, []);

  useEffect(() => {
    fetchData(offset, limit);
  }, [offset, limit, inputValue]);

  const fetchData = async (offset, limit) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/alerts?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    setAlerts(data.data);
    setShowBtn(true);
  };

  const fetchAllAlerts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/alerts`);
    const data = await res.json();
    setAllAlerts(data.data);
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

  const alertDetail = (alert) => {
    setAlert(alert);
    setShow(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = allAlerts;
    const newData = data.filter(function (item) {
      const itemDataTitle = item._source.agent.name.toUpperCase();
      const itemDataDescp = item._source.syscheck.event.toUpperCase();
      const campo = itemDataTitle + " " + itemDataDescp;
      const textData = inputValue.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setAlerts(newData);
    setShowBtn(false);
  };

  return (
    <>
      <div className="p-5">
        <div className="d-flex justify-content-between">
          <h1 className="text-white">Alerts</h1>
          <form className="input-group mb-3 w-25">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="button-addon2"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              id="button-addon2"
              onClick={onSubmit}
              onSubmit={(e) => onSubmit(e)}
            >
              Button
            </button>
          </form>
        </div>
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
              <AlertTable
                key={alert._id}
                alert={alert}
                alertDetail={alertDetail}
              />
            ))}
          </tbody>
        </table>
        {showBtn && (
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
        )}
      </div>
      {show && <AlertDetail setShow={setShow} alert={alert} />}
    </>
  );
};
