import React from "react";
import { useState, createContext } from "react";

export const usePlayer = () => {
  const [id, setId] = useState("Play");
  const playerContext = createContext(id);
  return { id, setId, playerContext };
};
