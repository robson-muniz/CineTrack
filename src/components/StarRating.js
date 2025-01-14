import React, { useState } from 'react';
import Star from './Star'; // Adjust the import path if needed

export default function StarRating({
                                     maxRating = 5,
                                     starSize = '4xl',
                                     starColor = 'yellow-500',
                                     numberSize = 'text-7xl',
                                     numberColor = 'text-yellow-500',
                                     onSetRating = () => {}, // Default to a no-op function
                                   }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRatingClick(newRating) {
    setRating(newRating);
    onSetRating(newRating); // Notify the parent of the selected rating
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRatingClick(i + 1)} // Handle rating click
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            size={starSize}
            color={starColor}
          />
        ))}
      </div>
      <p className={`m-0 leading-none ${numberSize} ${numberColor}`}>
        {tempRating || rating || ''}
      </p>
    </div>
  );
}