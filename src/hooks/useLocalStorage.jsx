import { useEffect, useState } from "react"; //import react hooks

const getSavedValue = (key, initialValue) => {
  //Define function
  const savedValue = JSON.parse(localStorage.getItem(key)); //fetch from local storage any item that has this key
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};
7;
export const useLocalStorage = (key, initialValue) => {
  //Hook itself
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue); //Using it for the first time. if there is a value saved it will fetch it
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); //
  }, [value]); //Dependency list []

  return [value, setValue];
};
