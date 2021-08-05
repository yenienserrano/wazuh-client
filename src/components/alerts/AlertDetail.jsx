import React from "react";
import "./alertDetail.css";

export const AlertDetail = ({ setShow, alert }) => {
  return (
    <div className="containerCss text-white bg-dark d-flex flex-column align-items-center justify-content-center">
      <div>
        <h1>Alert detail</h1>
        <div>
          <p>
            <b>Id:</b> {alert._id}
          </p>
          <p>
            <b>Index:</b> {alert._index}
          </p>
          <p>
            <b>Type:</b> {alert._type}
          </p>
        </div>
        <h3>Alert rule detail</h3>
        <div>
          <p>
            <b>Id:</b> {alert._source.rule.id}
          </p>
          <p>
            <b>Description:</b> {alert._source.rule.description}
          </p>
          <p>
            <b>Level:</b> {alert._source.rule.level}
          </p>
        </div>
        <h3>Alert agents detail</h3>
        <div>
          <p>
            <b>Id:</b> {alert._source.agent.id}
          </p>
          <p>
            <b>Name:</b> {alert._source.agent.name}
          </p>
          <p>
            <b>Ip:</b> {alert._source.agent.ip}
          </p>
        </div>
        <h3>Other</h3>
        <div>
          <p>
            <b>Manager:</b> {alert._source.manager.name}
          </p>
          <p>
            <b>cluster:</b> {alert._source.cluster.name}
          </p>
          <p>
            <b>Event:</b> {alert._source.syscheck.event}
          </p>
        </div>
      </div>
      <div>
        <button
          className="btn btn-outline-light"
          onClick={() => setShow(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
