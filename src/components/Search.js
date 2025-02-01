import {useEffect, useRef} from "react";
import {useKey} from "./useKey";

export function Search({query, setQuery}) {
   // const [query, setQuery] = useState("");
   //1 Step Ref
   const inputEl = useRef(null);

   useKey('Enter', function () {
      if(document.activeElement === inputEl.current) return
      inputEl.current.focus();
      setQuery("");

   })

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