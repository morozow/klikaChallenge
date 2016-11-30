import React, { Component, PropTypes } from 'react';

export class FilterControl extends Component {

  onChange(field) {
    const { onFilter } = this.props;
    return (event) => {
      event.preventDefault();
      onFilter(event, field);
    };
  }

  render() {
    const { options, field, value } = this.props;

    return (
      <div className="Filter__Control">
        {field}
        <select onChange={::this.onChange(field)} value={value || ''}>
          <option value={null}>-</option>
          {options && options
            .toJS()
            .map((o, key) => <option key={key} value={o.value}>{o.label}</option>)
          }
        </select>
      </div>
    );
  }
}

FilterControl.propTypes = {
  options: PropTypes.any,
  onFilter: PropTypes.any,
  field: PropTypes.string,
  value: PropTypes.string,
};
