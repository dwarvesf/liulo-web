import cc from 'classcat';

export const fieldErr = ({ touched, error, submitError }) => {
  return touched ? error || submitError : '';
};

export const withErrClass = (meta, className = '', errClassName = '') => {
  return cc([className, { [errClassName]: fieldErr(meta) }]);
};
