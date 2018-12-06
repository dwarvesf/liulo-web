import React from 'react';
import { connect } from 'redux-bundler-react';

import LogoText from '@/components/LogoText';

const Header = ({
  className,
  isLoggedIn,
  user,
  doOpenLoginDialog,
  doLogout,
}) => (
  <header className={className}>
    <div className="container md:py-10 py-4 px-4">
      <div className="flex items-center">
        <LogoText className="w-24 md:w-auto" />
        <ul className="ml-auto list-reset flex">
          <li className="px-3">
            {isLoggedIn ? (
              <button
                className="md:text-base text-sm text-black"
                type="button"
                onClick={() => doLogout()}
              >
                Logout
              </button>
            ) : (
              <button
                className="md:text-base text-sm text-black"
                type="button"
                onClick={() => doOpenLoginDialog()}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default connect(
  'selectIsLoggedIn',
  'selectUser',
  'doOpenLoginDialog',
  'doLogout',
  Header,
);
