import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";

export const Favourites = ({ allShows }) => {
  const [favourites, setFavourtes] = useLocalStorage("favourites");
  //add shows to the Favourites
  const sortedFavourites = () => {
    return [...favourites].reduce((acc, current) => {
      console.log(acc);
      acc[current] = acc[current]? acc[current].push
      return { ...acc, current: [current? current.currentShow] };
    }, {});
  };
  const sorted = sortedFavourites();
  const keys = Object.keys(sorted);
  return ( 
    <div>
      {keys.map((key) => {
        sorted[key].map((episode) => (
          <Card cardImage={episode.currentShow.image} title={episode.title} />
        ));
      })}
    </div>
  );
};
