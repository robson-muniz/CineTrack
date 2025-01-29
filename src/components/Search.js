import {useEffect, useRef, useState} from "react";

export function Search({query, setQuery}) {
   // const [query, setQuery] = useState("");
   //1 Step Ref
   const inputEl = useRef(null);

   //3 steps Ref
   useEffect(() => {

      function callback(e){
         if(document.activeElement === inputEl.current) return
         if (e.code === "Enter") {
      inputEl.current.focus();
      setQuery("");
         }
      }

      document.addEventListener("keydown", callback)
      return () => document.removeEventListener("keydown", callback)

   }, [setQuery])

   return (
      <input
         className="search"
         type="text"
         placeholder="Search movies..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         // 2 step Ref
        ref={inputEl}
      />
   )
}