import React, { PropTypes } from 'react';
import { SortIndicator } from 'react-virtualized';

export const headerRenderer = ({ dataKey, label, sortBy, sortDirection }) => {
  return (
    <div>
      {label}
      {sortBy === dataKey && <SortIndicator sortDirection={sortDirection}/>}
    </div>
  );
};

headerRenderer.propTypes = {
  dataKey: PropTypes.any,
  label: PropTypes.any,
  sortBy: PropTypes.any,
  sortDirection: PropTypes.any,
};
