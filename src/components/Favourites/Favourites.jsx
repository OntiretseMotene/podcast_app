import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";



export const CardData = ({ show, season }) => {
  return (
    <>
    <p>{show}</p>
    <p>{season}</p>
    </>
  )
}
export const Favourites = ({ allShows }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites");
  if (!favourites) return <p>No favourites to show!</p>
  // Add shows to the Favourites

  const uniqueShows = favourites.reduce((acc, current)=>{
    if (acc.includes(JSON.stringify(current.currentShow))) return acc
    acc.push(JSON.stringify(current.currentShow)) 
    return acc
  }, [])
  console.log(uniqueShows)

  // const sortedFavourites = () => {
  // };

  
  // return (
  //   // Your component JSX goes here
  // );

  // const sorted = sortedFavourites();
  
  return (
    <div>
        {favourites.map((episode) => (
          <Card cardImage={episode.currentShow.image} title={episode.title} data={<CardData />}/>
        ))
      }
    </div>
  );
};
