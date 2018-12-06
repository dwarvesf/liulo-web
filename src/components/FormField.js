import React, { Component } from 'react';
import getSlots from './utils/getSlots';

class FormField extends Component {
  constructor(props) {
    super(props);
    this.id = Math.random()
      .toString(36)
      .substr(2, 5);
  }

  getStyles = ({ msg, msgType }) => {
    if (!msg) return { input: '', msg: '' };
    switch (msgType) {
      case 'error':
        return { input: 'border-error', msg: 'text-error' };
      default:
        return { input: '', msg: '' };
    }
  };

  render() {
    const {
      children,
      className = '',
      msg = '',
      msgType = '',
      ...rest
    } = this.props;
    const classNames = this.getStyles({ msg, msgType });

    if (typeof children === 'function') {
      return children({
        labelProps: { htmlFor: this.id },
        inputProps: {
          id: this.id,
          className: classNames.input,
        },
        msgProps: { className: classNames.msg },
      });
    }

    const [inputEl, labelEl, msgEl, ...otherChildren] = getSlots(children, [
      'input',
      'label',
      'msg',
    ]);
    return (
      <div className={`input-container relative ${className}`} {...rest}>
        {labelEl && React.cloneElement(labelEl, { htmlFor: this.id })}
        {inputEl &&
          React.cloneElement(inputEl, {
            id: this.id,
            className: `${classNames.input} ${inputEl.props.className}`,
          })}
        {msgEl &&
          React.cloneElement(msgEl, {
            className: `${classNames.msg} ${msgEl.props.className}`,
          })}
        {otherChildren}
      </div>
    );
  }
}

export default FormField;
