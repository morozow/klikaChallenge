import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash-es/isEmpty';

import { FilterControl } from './FilterControl';
import { FILTER_FIELDS } from '../modules/Definitions';

export class Filter extends Component {

  render() {
    const { options, onFilter, clearFilter, filterState } = this.props;
    return (
      <div className="Filter">
        <div className="Filter__ControlsBlock">
          {!isEmpty(FILTER_FIELDS) && FILTER_FIELDS
            .map((field, key) => <FilterControl
              options={options.get(field)}
              field={field}
              onFilter={onFilter}
              value={filterState.get(field)}
              key={key}
            />)
          }
          <button onClick={clearFilter}>Clear filter</button>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  options: PropTypes.any,
  onFilter: PropTypes.any,
  clearFilter: PropTypes.any,
  filterState: PropTypes.any,
};
