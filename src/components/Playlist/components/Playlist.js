// @TODO: Create TEST Component and switch on/off relay.
// Possibility to check relay features without hard architecture of components

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { list as createList, map as createMap } from 'utils/immutable';

import flow from 'lodash-es/flow';
import assign from 'lodash-es/assign';
import uniqBy from 'lodash-es/uniqBy';
import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import fromPairs from 'lodash-es/fromPairs';

import { filter as filter$ } from 'rxjs/operator/filter';

import { GridTable } from './GridTable';
import { Filter } from './Filter';
import { FIELDS, FILTER_FIELDS } from '../modules/Definitions';
import { FilterEvent, recognizeFilterEvent } from '../events/FilterEvent';

import '../stylesheets/Grid.scss';

const createArray = (size) => new Array(size);
const createFakeDataArray = (size) => {
  const data = fromPairs(FIELDS.map(([field, _, fakerFn]) => ([field, fakerFn()])));
  return createArray(size).fill(data);
};

// Number -> Array -> List
const fakeList = flow([createFakeDataArray, createList]);

// @utils/graphql
const mapListNodes = (list) => map(list.edges, (edge) => {
  const { node, cursor } = edge;
  return { ...node, cursor };
});

const createGridList = (relayPlaylist) => createList(mapListNodes(relayPlaylist));

export class Playlist extends Component {

  state = {
    $gridList: createList([]),
  };

  // Map of filter options values
  $filterOptions = createMap({});

  // Map of current filter state
  $filterState = createMap({});

  // Original loaded grid rows
  $originalGridList = createList([]);

  constructor(props) {
    super(props);

    const { event$$ } = this.props;
    event$$::filter$(recognizeFilterEvent)
      .subscribe(({ field, value }) => {
        const { $originalGridList, $filterState } = this;

        // update filter state according new event
        const $nextFilterState = (value === '-')
          ? $filterState.delete(field)
          : $filterState.merge({ [field]: value });

        // working with new $filterState value
        const $gridList = !$nextFilterState.isEmpty()
          ? createList(filter($originalGridList.toJS(), $nextFilterState.toJS()))
          : $originalGridList;

        assign(this, { $filterState: $nextFilterState });
        this.setState({ $gridList });
      });
  }

  componentDidMount() {
    // default grid list from props as start data
    assign(this, {
      $originalGridList: createList(mapListNodes(this.props.playlist.tracks)),
    });

    // Safe setState in componentDidMount()
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ $gridList: this.$originalGridList });
  }

  componentWillUpdate() {
    const { $filterOptions, $originalGridList } = this;

    const mapper = (field) => ({ [field]: value }) => ({ label: value, value });
    const valueFn = ({ value }) => value;
    const updateOptions = ($options, field) => {
      const $nextFieldOptions = createList(
        uniqBy($originalGridList.map(mapper(field)).toJS(), valueFn)
      ).sortBy(valueFn);
      return $options.set(field, $nextFieldOptions);
    };

    const options = reduce(FILTER_FIELDS, updateOptions, $filterOptions);

    assign(this, { $filterOptions: options });
  }

  // componentWillReceiveProps(props) {
  //   console.log('componentWillReceiveProps: ', props);
  //   // default grid list from props as start data
  //   assign(this, {
  //     $originalGridList: createList(mapListNodes(this.props.playlist.tracks)),
  //   });
  //
  //   // Safe setState in componentDidMount()
  //   // eslint-disable-next-line react/no-did-mount-set-state
  //   this.setState({ $gridList: this.$originalGridList });
  // }

  loadFakeListMore({ stopIndex, startIndex }) { // eslint-disable-line consistent-return
    const { $originalGridList, $filterState } = this;

    // work only with loaded rows when filter if active
    if (!$filterState.isEmpty()) {
      return false;
    }

    // const relayNewRows = new Promise((resolve, reject) => {
    //   this.props.relay.setVariables({
    //     first: stopIndex - startIndex,
    //     after: $originalGridList.last().cursor,
    //   }, ({ done, error }) => {
    //     if (error) reject(error);
    //     if (done) resolve();
    //   });
    // });
    // relayNewRows.then(() => console.log('Promise resolved'));
    // relayNewRows.then(() => setState({ $gridList: ... }));

    // console.log('this.props.relay.variables: ', this.props.relay.variables);
    // const promise = new Promise((resolve) => {
    //   this.props.relay.setVariables({
    //     first: this.props.relay.variables.first + (stopIndex - startIndex),
    //   }, () => resolve());
    // });
    // promise.then(() => console.log('Resolved this.props: ', this.props));
    // const $gridList = createList(mapListNodes(this.props.playlist.tracks));
    // assign(this, { $originalGridList: $gridList });
    // this.setState({ $gridList });

    const $gridList = $originalGridList.concat(fakeList(stopIndex - startIndex));
    assign(this, { $originalGridList: $gridList });
    this.setState({ $gridList });
  }

  onFilter(event, field) {
    const { event$$ } = this.props;
    event$$.next(FilterEvent.create({
      event: {
        originalEvent: event,
        field,
      },
    }));
  }

  openTrack(track) {
    const { update$$ } = this.props;
    update$$.next({ track });
    browserHistory.push('track');
  }

  clearFilter() {
    assign(this, { $filterState: createMap({}) });
    this.setState({ $gridList: this.$originalGridList });
  }

  testSetVariables(e) {
    e.preventDefault();
    this.props.relay.setVariables({
      first: this.props.relay.variables.first + (10),
    });
  }

  render() {
    const { $gridList } = this.state;
    const { $filterState, $filterOptions } = this;

    console.log('this.props.relay: ', this.props.playlist);

    return (
      <div className="Grid">
        <button onClick={::this.testSetVariables}>Change Variables</button>
        <div className="Grid__Filter">
          <Filter
            filterState={$filterState}
            options={$filterOptions}
            onFilter={::this.onFilter}
            clearFilter={::this.clearFilter}
          />
        </div>
        <div className="Grid__Table">
          <GridTable
            openTrack={::this.openTrack}
            gridList={$gridList}
            loadMoreRows={::this.loadFakeListMore}
          />
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  event$$: PropTypes.any,
  update$$: PropTypes.any,
  pageState: PropTypes.any,
  playlist: PropTypes.any,
  relay: PropTypes.any,
};
