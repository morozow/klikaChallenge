import React, { Component, PropTypes } from 'react';
import { list as createList, map as createMap } from 'utils/immutable';

import flow from 'lodash-es/flow';
import assign from 'lodash-es/assign';
import uniqBy from 'lodash-es/uniqBy';
import filter from 'lodash-es/filter';
import fromPairs from 'lodash-es/fromPairs';

import { filter as filter$ } from 'rxjs/operator/filter';

import { GridTable } from './GridTable';
import { Filter } from './Filter';
import { FIELDS, FILTER_FIELDS } from '../modules/Definitions';
import { FilterEvent, recognizeFilterEvent } from '../modules/FilterEvent';

import '../stylesheets/Grid.scss';

const createArray = (size) => new Array(size);
const createFakeDataArray = (size) => {
  const data = fromPairs(FIELDS.map(([field, fakerFn]) => ([field, fakerFn()])));
  return createArray(size).fill(data);
};

// Number -> Array -> List
const fakeList = flow([createFakeDataArray, createList]);

export class Playlist extends Component {

  state = {
    gridList: createList([]),
  };

  // Map of filter options values
  filterOptions = createMap({});

  // Map of current filter state
  filterState = createMap({});

  // Original loaded grid rows
  originalGridList = createList([]);

  constructor(props) {
    super(props);

    const { event$$ } = this.props;
    event$$::filter$(recognizeFilterEvent)
      .subscribe((filterEvent) => {
        const { originalGridList } = this;

        // update filter state according new event
        const nextFilterState = (filterEvent.value === '-')
          ? this.filterState.delete(filterEvent.field)
          : this.filterState.merge({ [filterEvent.field]: filterEvent.value });
        assign(this, { filterState: nextFilterState });

        // working with new filterState value
        const gridList = !this.filterState.isEmpty()
          ? createList(filter(originalGridList.toJS(), this.filterState.toJS()))
          : originalGridList;

        this.setState({ gridList });
      });
  }

  componentDidMount() {
    // different data to check default sort
    const gridList = fakeList(5).concat(fakeList(5), fakeList(5), fakeList(5));
    assign(this, { originalGridList: gridList });

    // Safe setState in componentDidMount()
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ gridList: this.originalGridList });
  }

  componentWillUpdate() {
    let { filterOptions } = this;

    FILTER_FIELDS.forEach((field) => {
      const options = createList(uniqBy(
        this.originalGridList.map(
          ({ [field]: value }) => ({ label: value, value })
        ).toJS(), ({ value }) => value)).sortBy(({ value }) => value);
      filterOptions = filterOptions.set(field, options);
    });

    assign(this, { filterOptions });
  }

  loadFakeListMore({ stopIndex, startIndex }) { // eslint-disable-line consistent-return
    // work only with loaded rows when filter if active
    if (!this.filterState.isEmpty()) {
      return false;
    }
    let gridList = this.originalGridList.concat(fakeList(stopIndex - startIndex));

    // save original grid list for empty filter
    assign(this, { originalGridList: gridList });
    if (!this.filterState.isEmpty()) {
      gridList = createList(filter(gridList.toJS(), this.filterState.toJS()));
    }
    this.setState({ gridList });
  }

  onFilter(event, field) {
    const { event$$ } = this.props;
    event$$.next(FilterEvent.create({
      type: 'filter',
      event: {
        originalEvent: event,
        field,
      },
    }));
  }

  clearFilter() {
    this.filterState = createMap([]);
    this.setState({ gridList: this.originalGridList });
  }

  render() {
    const { gridList } = this.state;
    const { filterState, filterOptions } = this;

    return (
      <div className="Grid">
        <div className="Grid__Filter">
          <Filter
            filterState={filterState}
            options={filterOptions}
            onFilter={::this.onFilter}
            clearFilter={::this.clearFilter}
          />
        </div>
        <div className="Grid__Table">
          <GridTable
            gridList={gridList}
            loadMoreRows={::this.loadFakeListMore}
          />
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  event$$: PropTypes.any,
};
