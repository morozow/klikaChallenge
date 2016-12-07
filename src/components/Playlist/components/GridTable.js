/** @flow */

import React, { Component, PropTypes } from 'react';
import {
  AutoSizer,
  Column,
  InfiniteLoader,
  SortDirection,
  Table,
} from 'react-virtualized';
import { list as createList, directionSort } from 'utils/immutable';
import isEmpty from 'lodash-es/isEmpty';
import reduce from 'lodash-es/reduce';

import 'react-virtualized/styles.css';

import { headerRenderer } from '../modules/headerRenderer.jsx';
import { DISPLAY_ROWS_LIST, FULL_LIST_SIZE, FIELDS } from '../modules/Definitions';

const initState = (props) => ({
  sortBy: props.sortBy || 'artist',
  sortDirection: props.sortDirection || SortDirection.ASC,
  gridList: props.gridList || createList([]),
  displayRowsNumber: props.displayRowsNumber || 10,
});

export class GridTable extends Component {

  settings = {
    headerHeight: 30,
    height: 300,
    rowHeight: 40,
    width: 800,
  };

  constructor(props) {
    super(props);
    this.state = initState(props);
  }

  componentWillReceiveProps(props) {
    const { sortBy, sortDirection } = this.state;
    this.setState({ gridList: directionSort(props.gridList, sortBy, sortDirection) });
  }

  sortGrid({ sortBy, sortDirection }) {
    const { gridList } = this.state;
    this.setState({
      gridList: directionSort(gridList, sortBy, sortDirection),
      sortBy,
      sortDirection,
    });
  }

  changeViewSize(size) {
    return (e) => {
      e.preventDefault();
      this.setState({ displayRowsNumber: size });
    };
  }

  render() {
    const {
      sortBy,
      sortDirection,
      gridList,
      displayRowsNumber,
    } = this.state;

    const { loadMoreRows } = this.props;
    const { headerHeight, rowHeight, width } = this.settings;

    const rowGetter = ({ index }) => gridList.get(index);
    const isRowLoaded = ({ index }) => !!gridList.get(index);
    const cellDataGetter = ({ dataKey, rowData }) => rowData[dataKey];
    const calculateHeight =
      (size) => ((rowHeight * size) + headerHeight) - 1;

    // height depends on displayed rows value even when list is empty or short
    const height = calculateHeight(displayRowsNumber);

    const createHeaders = (acc, [name, label, _, columnWidth], key) => {
      return acc.push(<Column
        key={key}
        label={label}
        dataKey={name}
        cellDataGetter={cellDataGetter}
        headerRenderer={headerRenderer}
        disableSort={false}
        width={columnWidth}
      />);
    };

    const headers = reduce(FIELDS, createHeaders, createList()).toJS();

    return (
      <div className="GridTable">
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={FULL_LIST_SIZE}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight disableWidth>
              {() => (
                <Table
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  noRowsRenderer={noRowsRenderer}
                  headerHeight={headerHeight}
                  height={height}
                  rowHeight={rowHeight}
                  rowGetter={rowGetter}
                  rowCount={gridList.size}
                  sort={::this.sortGrid}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  width={width}
                >
                  {headers}
                </Table>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
        <div className="GridTable__SizesList">
          {!isEmpty(DISPLAY_ROWS_LIST) && DISPLAY_ROWS_LIST
            .map((size, key) =>
              <button key={key} onClick={::this.changeViewSize(size)}>{size}</button>
            )
          }
        </div>
      </div>
    );
  }
}

GridTable.propTypes = {
  loadMoreRows: PropTypes.any,
};

const noRowsRenderer = () => {
  return (
    <div className="ReactVirtualized__Table__noRows">
      Empty playlist
    </div>
  );
};
