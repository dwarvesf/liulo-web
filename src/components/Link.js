import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';
import queryString from 'query-string';
import { connect } from 'redux-bundler-react';

const parseUrl = to => {
  if (typeof to === 'string') return to;
  const { pathname, query } = to;
  const qs = queryString.stringify(query);
  return `${pathname}${qs ? '?' + qs : ''}`;
};

const Link = ({
  to = '#',
  className = 'no-underline',
  activeClassName = 'active',
  exact = false,
  children,
  pathname,
  ...rest
}) => {
  // exact requires full match
  const url = parseUrl(to);
  const active = exact ? url === pathname : pathname.startsWith(url);

  return (
    <a
      href={url}
      className={cc({
        [className]: className,
        [activeClassName]: active && className + ' ' + active,
      })}
      {...rest}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  exact: PropTypes.bool,
};

export default connect(
  'selectPathname',
  Link,
);
