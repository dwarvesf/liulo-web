import React from 'react';
import { connect } from 'redux-bundler-react';
import navHelper from 'internal-nav-helper';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginDialog from '@/components/LoginDialog';

const App = ({ doUpdateUrl, route, loginDialogStatus, doCloseLoginDialog }) => {
  return (
    <main
      onClick={navHelper(doUpdateUrl)}
      className="flex flex-col min-h-screen"
    >
      <Header />
      <div className="flex-grow flex flex-col">
        <route.C />
      </div>
      <Footer />
      <LoginDialog
        isShow={loginDialogStatus}
        onClose={() => {
          doCloseLoginDialog();
        }}
      />
    </main>
  );
};

export default connect(
  'selectRoute',
  'selectPathname',
  'selectLoginDialogStatus',
  'doCloseLoginDialog',
  'doUpdateUrl',
  App,
);
