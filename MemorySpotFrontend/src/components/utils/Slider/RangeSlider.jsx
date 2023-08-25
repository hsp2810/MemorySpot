import React from 'react';

const RangeSlider = ({ radius, setRadius }) => {
  const handleChange = event => {
    setRadius(event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={radius}
        onChange={handleChange}
        step="0.1"
      />
      <p>{radius}km</p>
    </div>
  );
};

export default RangeSlider;
