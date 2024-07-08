import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";

// export const Favourites = ({ allShows }) => {
//   const [favourites, setFavourites] = useLocalStorage("favourites");
//   //add shows to the Favourites
//   const sortedFavourites = () => {
//     return [...favourites].reduce((acc, current) => {
//       console.log(acc);
//       acc[current] = acc[current]? acc[current]
//       return { ...acc, current: [current? current.currentShow] };
//     }, {});
//   };
export const Favourites = ({ allShows }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites");

  // Add shows to the Favourites
  const sortedFavourites = () => {
    return favourites.reduce((acc, current) => {
      if (acc[current]) {
        return acc;
      } else {
        return { ...acc, [current]: current.currentShow };
      }
    }, {});
  };

  // Assuming you need to call the sortedFavourites somewhere
  const sortedFavs = sortedFavourites();
  console.log(sortedFavs);

  // return (
  //   // Your component JSX goes here
  // );

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
