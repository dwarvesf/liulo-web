import React from 'react';
import { fieldErr, withErrClass } from '@/utils/form';

export { fieldErr, withErrClass };

export const Input = ({
  className = '',
  errClassName = '',
  fieldMeta,
  type,
  ...rest
}) => {
  const c = withErrClass(fieldMeta, className, errClassName);
  return type === 'area' ? (
    <textarea className={c} {...rest} />
  ) : (
    <input className={c} type={type} {...rest} />
  );
};

export default Input;

export const InputMsg = ({
  className = '',
  errClassName = '',
  fieldMeta,
  ...rest
}) => {
  const c = withErrClass(fieldMeta, className, errClassName);
  return (
    <span className={c} {...rest}>
      {fieldErr(fieldMeta)}
    </span>
  );
};
