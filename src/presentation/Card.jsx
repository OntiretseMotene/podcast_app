import React from "react";

export const Card = ({
  cardImage,
  title,
  showid,
  description,
  genre,
  seasons,
  date,
}) => {
  return (
    <>
      <div className="shows">
        <div className="card">
          <img className="card-image" src={cardImage} width={"400px"} />
          <p className="card-title">{title}</p>
          <p className="card-showid">{showid}</p>
          {/* <p className="card-description">{description}</p> */}
          <p className="card-genre">{genre}</p>
          <p className="card-season}">{seasons}</p>
          <p className="card-date">{date}</p>
        </div>
      </div>
    </>
  );
};
