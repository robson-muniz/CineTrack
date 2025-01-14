import { GoStarFill, GoStar } from "react-icons/go";

function Star({ onClick, full, onHoverIn, onHoverOut, size = '4xl', color = '#F59E0B'}) {
   const StarIcon = full ? GoStarFill : GoStar;

   return (
      <StarIcon
         role="button"
         onClick={onClick}
         onMouseEnter={onHoverIn}
         onMouseLeave={onHoverOut}
         style={{ fontSize: `4rem`, color:'#F59E0B' }}  // Apply custom size and color
         className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-125"
      />
   );
}

export default Star;