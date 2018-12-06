import React from 'react';
import { connect } from 'redux-bundler-react';

import Link from '@/components/Link';
import LogoText from '@/components/LogoText';

const Header = ({
  className,
  isLoggedIn,
  user,
  doOpenLoginDialog,
  doLogout,
}) => (
  <header className={className}>
    <div className="container lg:py-10 py-4 px-4">
      <div className="flex items-center">
        <LogoText className="w-24 lg:w-auto" />
        <ul className="ml-auto list-reset flex">
          <li className="px-3">
            <Link to="/" className="lg:text-base text-sm text-black">
              Join Event
            </Link>
          </li>
          <li className="px-3">
            {isLoggedIn ? (
              <button
                className="lg:text-base text-sm text-black"
                type="button"
                onClick={() => doLogout()}
              >
                Logout
              </button>
            ) : (
              <button
                className="lg:text-base text-sm text-black"
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
