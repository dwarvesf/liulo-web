import React from 'react';

const Vote = ({ className, color = 'none' }) => (
  <svg
    className={className}
    width="17px"
    height="22px"
    viewBox="0 0 17 22"
    version="1.1"
  >
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill={color}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g id="Question/Guest" transform="translate(-1083.000000, -44.000000)">
        <g id="Question-1">
          <g id="direction-up" transform="translate(1083.000000, 44.000000)">
            <polygon
              id="Shape"
              stroke="#E13F5E"
              points="8.5 0.5 0.5 10.5 5.5 10.5 5.5 17.5 11.5 17.5 11.5 10.5 16.5 10.5"
            />
            <path d="M5.5,21.5 L11.5,21.5" id="Shape" stroke="#191B39" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Vote;
