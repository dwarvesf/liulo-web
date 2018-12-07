import React from 'react';

const Reply = ({ className, color = 'none' }) => (
  <svg
    width="23px"
    height="17px"
    viewBox="0 0 23 17"
    version="1.1"
    className={className}
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
      <g
        id="Mobile/Component/Option-Host-Copy"
        transform="translate(-241.000000, -12.000000)"
        stroke={color === 'none' ? '#191B39' : color}
      >
        <g id="Question/Option-Host-Copy">
          <g id="Icon/Reply" transform="translate(232.000000, 0.000000)">
            <g id="reply" transform="translate(10.000000, 12.000000)">
              <path
                d="M0,8 L8,0 L8,5 C13.6,5 21,7.2 21,17 C18.3,12.4 15.5,11 8,11 L8,16 L0,8 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Reply;
