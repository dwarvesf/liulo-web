import React from 'react';
import Dialog from '@/components/Dialog';
import GoogleLogin from 'react-google-login';
import { connect } from 'redux-bundler-react';

import { ReactComponent as SvgGoogle } from '@/components/svg/google-brands.svg';
import { ReactComponent as SvgClose } from '@/components/svg/close.svg';

class LoginDialog extends React.Component {
  responseGoogle = rsp => {
    const { accessToken } = rsp;
    if (accessToken) {
      return this.props
        .doLogin({ accessToken, provider: 'google' })
        .then(() => {
          this.props.doCloseLoginDialog();
          return undefined;
        })
        .catch(err => {
          console.dir(err);
          alert('Something went wrong. Please try again');
        });
    }
  };
  render() {
    return (
      <Dialog isOpen={this.props.isShow}>
        <div className="dialog bg-white rounded overflow-hidden dialog text-center leading-none h-full relative">
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.onClose();
            }}
          >
            <SvgClose className="absolute pin-r pin-t mt-4 mr-4" />
          </button>
          <h3 className="text-3xl mb-10 font-medium">Login</h3>
          <div style={{ width: '280px' }} className="mx-auto">
            <GoogleLogin
              clientId="1017135429311-5isdspj6lrpqjkrc2vsvbdopqstdvk6l.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  className="btn-primary btn-group btn-group-lg flex w-full items-center"
                  type="button"
                  onClick={renderProps.onClick}
                >
                  <span className="icon">
                    <SvgGoogle height="18" />
                  </span>
                  Login with using Google
                </button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  'doLogin',
  'doCloseLoginDialog',
  LoginDialog,
);
