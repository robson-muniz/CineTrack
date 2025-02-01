import {useEffect, useState} from "react";

export function useLocalStorage(initialState, key) {

  const [value, setValue] = useState(function (){
    const storedValue = JSON.parse(localStorage.getItem(key));
    console.log(storedValue);
    return storedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return[value, setValue];

}