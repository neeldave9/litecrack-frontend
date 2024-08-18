import React from "react";

export default function Error({ name, type, description }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title">
                {name}: {type}
              </h1>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
