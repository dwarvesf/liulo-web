import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import './style.scss';

Modal.setAppElement('#app');

class Dialog extends PureComponent {
  render() {
    const { ...rest } = this.props;
    return (
      <Modal
        shouldCloseOnEsc={true}
        bodyOpenClassName="overflow-hidden"
        overlayClassName={{
          base: 'dialog-underlay',
          afterOpen: 'dialog-underlay--open',
        }}
        className="dialog-content font-sans"
        {...rest}
      />
    );
  }
}

export default Dialog;
