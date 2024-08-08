import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Card } from "../../presentation/Card";



export const CardData = ({ season }) => {
  return (
    <>
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
  

  const sortedShows = uniqueShows.map((show) => {
    const filteredEpisodes = favourites.filter((episode)=> JSON.stringify(episode.currentShow)===show)
    const sortedEpisodes = filteredEpisodes.sort((a, b)=> a.season > b.season ? 1 : -1)
    return sortedEpisodes
  }
  
  )

  // const sortedFavourites = () => {
  // };

  
  // return (
  //   // Your component JSX goes here
  // );

  // const sorted = sortedFavourites();
  
  return (
    <div>
        { uniqueShows.map((shows, i)=>
          {
            return (
            <div >
              <h2>{JSON.parse(shows).title}</h2>
              <div style={{display:"flex"}}>{sortedShows[i].map((episode)=>
                {
                  return <Card cardImage={episode.currentShow.image} title={episode.episode.title} data={<CardData  season={episode.season}/>}/>}
            
            )}</div></div>)
        })}
    </div>
  );
};
{/* <Card cardImage={episode.currentShow.image} title={episode.title} data={<CardData />}/> */}

