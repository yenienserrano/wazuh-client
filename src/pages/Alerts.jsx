import React, { useEffect, useState } from "react";
import { AlertDetail } from "../components/alerts/AlertDetail";
import { AlertTable } from "../components/alerts/AlertTable";

export const Alerts = () => {
  const [allAlerts, setAllAlerts] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [dataFiltered, setdataFiltered] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [filter, setFilter] = useState("withoutFilter");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchAllAlerts();
  }, []);

  useEffect(() => {
    fetchData(offset, limit);
  }, [offset, limit]);

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
    setdataFiltered(data.data);
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

    if (inputValue.length === 0) {
      handleFilter(filter);
    } else {
      const data = dataFiltered;
      const newData = data.filter((item) => {
        const nameAgent = item._source.agent.name.toUpperCase();
        const alertEvent = item._source.syscheck.event.toUpperCase();
        const campo = nameAgent + " " + alertEvent;
        const textData = inputValue.toUpperCase();
        return campo.indexOf(textData) > -1;
      });
      setAlerts(newData);
      setShowBtn(false);
    }
  };

  const handleFilter = (e) => {
    if (e === "withoutFilter") {
      fetchData(offset, limit);
      setFilter(e);
      setInputValue("");
      setdataFiltered(allAlerts);
    } else {
      const data = allAlerts;
      const newData = data.filter((item) => {
        const nameAgent = item._source.agent.name.toUpperCase();
        const textData = e.toUpperCase();
        return nameAgent.indexOf(textData) > -1;
      });
      setAlerts(newData);
      setShowBtn(false);
      setFilter(e);
      setInputValue("");
      setdataFiltered(newData);
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="d-flex justify-content-between">
          <h1 className="text-white">Alerts</h1>
          <div className="d-flex">
            <p className="text-white">Filter by agent:</p>
            <select
              className="form-select h-75 w-50 me-3"
              aria-label="Default select example"
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="withoutFilter">All</option>
              <option value="Ubuntu">Ubuntu</option>
              <option value="Debian">Debian</option>
              <option value="ip-10-0-0-180.us-west-1.compute.internal">
                ip-10-0-0-180.us-west-1.compute.internal
              </option>
              <option value="Amazon">Amazon</option>
              <option value="RHEL7">RHEL7</option>
              <option value="Centos">Centos</option>
              <option value="Windows">Windows</option>
            </select>
            <form className="input-group mb-3 w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={inputValue}
                aria-describedby="button-addon2"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="btn btn-primary-page"
                type="submit"
                id="button-addon2"
                onClick={onSubmit}
                onSubmit={(e) => onSubmit(e)}
              >
                Search
              </button>
            </form>
          </div>
        </div>
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
                <button className="btn btn-primary-page" onClick={prevPage}>
                  Prev
                </button>
              )}
            </div>
            <div className="d-flex justify-content-end">
              {+offset >= 90 ? null : (
                <button className="btn btn-primary-page" onClick={nextPage}>
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
