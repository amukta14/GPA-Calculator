import React from 'react';

const FlowerDecoration = ({ style }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className="flower-animation"
  >
    <circle cx="24" cy="24" r="8" fill="#f06292" />
    <ellipse cx="24" cy="10" rx="4" ry="8" fill="#b388ff" />
    <ellipse cx="24" cy="38" rx="4" ry="8" fill="#b388ff" />
    <ellipse cx="10" cy="24" rx="8" ry="4" fill="#b388ff" />
    <ellipse cx="38" cy="24" rx="8" ry="4" fill="#b388ff" />
  </svg>
);

export default FlowerDecoration; 