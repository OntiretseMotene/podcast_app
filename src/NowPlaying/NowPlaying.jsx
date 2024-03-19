import React, { useEffect, useState, useContext } from "react";
import { usePlayer } from "../hooks/usePlayer";

export const NowPlaying = ({ children, currentShow }) => {
  const { playerContext } = usePlayer();
  const id = useContext(playerContext);

  return (
    <div>
      {id + "App"}
      {children}
      NowPlaying
      {currentShow.title}
      {currentShow.description}
      {currentShow.seasons?.length}
    </div>
  );
};
