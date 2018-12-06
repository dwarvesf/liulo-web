import React from 'react';
import './LogoText.scss';

const Logo = ({
  titleClass = 'text-primary',
  descClass = 'text-black',
  ...rest
}) => (
  <svg width="200px" height="49px" viewBox="0 0 180 49" {...rest}>
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Component/Header-Member"
        transform="translate(-50.000000, -38.000000)"
      >
        <g id="Header">
          <g id="Title">
            <g id="Group" transform="translate(50.000000, 31.000000)">
              <g id="Component/Logo" transform="translate(0.000000, 8.000000)">
                <g id="Logo">
                  <path
                    d="M42.96,0.5 L19.04,0.5 C18.7374739,0.5 18.5,0.728340317 18.5,1 C18.5,1.27165968 18.7374739,1.5 19.04,1.5 L42.96,1.5 C43.2625261,1.5 43.5,1.27165968 43.5,1 C43.5,0.728340317 43.2625261,0.5 42.96,0.5 Z"
                    id="Shape"
                    stroke="#191B39"
                    fillRule="nonzero"
                  />
                  <path
                    d="M42.96,15.1666667 L19.04,15.1666667 C18.7374739,15.1666667 18.5,15.395007 18.5,15.6666667 C18.5,15.9383263 18.7374739,16.1666667 19.04,16.1666667 L42.96,16.1666667 C43.2625261,16.1666667 43.5,15.9383263 43.5,15.6666667 C43.5,15.395007 43.2625261,15.1666667 42.96,15.1666667 Z"
                    id="Shape"
                    stroke="#191B39"
                    fillRule="nonzero"
                  />
                  <path
                    d="M42.96,29.8333333 L19.04,29.8333333 C18.7374739,29.8333333 18.5,30.0616737 18.5,30.3333333 C18.5,30.604993 18.7374739,30.8333333 19.04,30.8333333 L42.96,30.8333333 C43.2625261,30.8333333 43.5,30.604993 43.5,30.3333333 C43.5,30.0616737 43.2625261,29.8333333 42.96,29.8333333 Z"
                    id="Shape"
                    stroke="#191B39"
                    fillRule="nonzero"
                  />
                  <path
                    d="M42.96,44.5 L19.04,44.5 C18.7374739,44.5 18.5,44.7283403 18.5,45 C18.5,45.2716597 18.7374739,45.5 19.04,45.5 L42.96,45.5 C43.2625261,45.5 43.5,45.2716597 43.5,45 C43.5,44.7283403 43.2625261,44.5 42.96,44.5 Z"
                    id="Shape-Copy"
                    stroke="#191B39"
                    fillRule="nonzero"
                  />
                  <rect
                    id="Rectangle-path"
                    stroke="#191B39"
                    fillRule="nonzero"
                    x="0.5"
                    y="0.5"
                    width="11"
                    height="11"
                    rx="1"
                  />
                  <rect
                    id="Rectangle-path"
                    stroke="#191B39"
                    fillRule="nonzero"
                    x="0.5"
                    y="34.5"
                    width="11"
                    height="11"
                    rx="1"
                  />
                  <path
                    d="M11.1977983,16.4008027 L4.89387567,24.4954978 L1.69442245,21.2999606 C1.30211061,20.9215169 0.678511287,20.9269292 0.292843399,21.312125 C-0.0928244896,21.6973209 -0.0982433991,22.3201569 0.280664056,22.7119886 L4.27998058,26.70641 C4.46752219,26.8943089 4.72221993,26.9999438 4.9878596,27 L5.04984901,27 C5.33597943,26.9821729 5.60068202,26.8425287 5.77672479,26.6165355 L12.7755287,17.6290873 C13.0043555,17.3483552 13.0631503,16.9659207 12.9291957,16.6295517 C12.7952411,16.2931826 12.4895159,16.0555584 12.1301484,16.0084939 C11.770781,15.9614295 11.4140525,16.1122958 11.1977983,16.4027999 L11.1977983,16.4008027 Z"
                    id="Shape"
                    fill="#E13F5E"
                    fillRule="nonzero"
                  />
                </g>
              </g>
              <text
                id="Name"
                fontFamily="Lato-Heavy, Lato"
                fontSize="32"
                fontWeight="600"
                line-spacing="38"
                letterSpacing="-0.1"
                fill="currentColor"
                className={titleClass}
              >
                <tspan x="60" y="32">
                  liulo
                </tspan>
              </text>
              <text
                id="Tagline"
                fontFamily="Lato-Medium, Lato"
                fontSize="14"
                fontWeight="400"
                fill="currentColor"
                className={descClass}
              >
                <tspan x="60" y="53">
                  gửi câu hỏi dễ dàng
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Logo;
