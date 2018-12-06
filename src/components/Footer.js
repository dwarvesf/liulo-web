import React from 'react';

const Footer = ({ className }) => (
  <footer>
    <div className="container px-4 lg:text-base text-sm">
      <hr className="h-px bg-grey-lighter" />
      <div className="flex py-4 flex-wrap">
        <div className="text-grey-darkest opacity-50">
          Dwarves, LLC © 2018 All rights reserved.
        </div>
        <div className="ml-auto flex flex-wrap">
          <div className="lg:mr-12 mr-4">
            <a
              href="mailto:team@dwarves.foundation"
              className="text-grey-darkest"
            >
              team@dwarves.foundation
            </a>
          </div>
          <div className="text-grey-darkest opacity-50">
            2035 Sunset Lake, Delaware, US 19702
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
