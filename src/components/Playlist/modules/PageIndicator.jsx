import React, { PropTypes } from 'react';
import cn from 'classnames';

export const PageIndicator = ({ page, active }) => {
  const className = cn({
    GridTable__Pagination__indicator: true,
    active: Boolean(active),
  });
  return <div className={className}>{page}</div>;
};

PageIndicator.propTypes = {
  page: PropTypes.number.isRequired,
  active: PropTypes.any,
};
