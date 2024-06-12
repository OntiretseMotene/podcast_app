import React from "react";

export const Card = ({ cardImage, title, data }) => {
  return (
    <>
      <div className="shows">
        <div className="card">
          <img className="card-image" src={cardImage} width={"400px"} />
          <h3 className="card-title">{title}</h3>
          {data}
        </div>
      </div>
    </>
  );
};
