import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";

export const Favourites = ({ allShows }) => {
  const [favourites, setFavourtes] = useLocalStorage("favourites");

  const filterFavourites = (allShows) => {};
  return (
    <div>
      {favourites.map((episode) => {
        console.log(episode.date);
        return (
          <Card
            cardImage={episode.currentShow.image}
            showid={episode.currentShow.id}
            description={episode.episode.description}
            genre={episode.episode.genres}
            date={episode.date}
          />
        );
      })}
    </div>
  );
};
