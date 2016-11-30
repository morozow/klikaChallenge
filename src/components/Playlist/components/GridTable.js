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

import 'react-virtualized/styles.css';

import { headerRenderer } from '../modules/headerRenderer.jsx';
import { DISPLAY_ROWS_LIST, FULL_LIST_SIZE } from '../modules/Definitions';

export class GridTable extends Component {

  settings = {
    headerHeight: 30,
    height: 300,
    rowHeight: 40,
    width: 800,
    displayRowsNumber: 10,
  };

  constructor(props) {
    super(props);

    const { displayRowsNumber } = this.settings;

    this.state = {
      sortBy: 'artist',
      sortDirection: SortDirection.ASC,
      gridList: createList([]),
      displayRowsNumber,
    };
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
    const { settings } = this;

    const rowGetter = ({ index }) => gridList.get(index);
    const isRowLoaded = ({ index }) => !!gridList.get(index);
    const cellDataGetter = ({ dataKey, rowData }) => rowData[dataKey];
    const calculateHeight =
      (size) => ((settings.rowHeight * size) + settings.headerHeight) - 1;

    // height depends on displayed rows value event when list is empty or short
    const height = calculateHeight(displayRowsNumber);

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
                  headerHeight={settings.headerHeight}
                  height={height}
                  rowHeight={settings.rowHeight}
                  rowGetter={rowGetter}
                  rowCount={gridList.size}
                  sort={::this.sortGrid}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  width={settings.width}
                >
                  <Column
                    label={'Index'}
                    dataKey={'index'}
                    cellDataGetter={cellDataGetter}
                    headerRenderer={headerRenderer}
                    disableSort={false}
                    width={100}
                  />
                  <Column
                    label={'Artist'}
                    dataKey={'artist'}
                    cellDataGetter={cellDataGetter}
                    disableSort={false}
                    headerRenderer={headerRenderer}
                    width={200}
                  />
                  <Column
                    label={'Song'}
                    dataKey={'song'}
                    cellDataGetter={cellDataGetter}
                    disableSort={false}
                    headerRenderer={headerRenderer}
                    width={250}
                  />
                  <Column
                    label={'Genre'}
                    dataKey={'genre'}
                    cellDataGetter={cellDataGetter}
                    disableSort={false}
                    headerRenderer={headerRenderer}
                    width={150}
                  />
                  <Column
                    label={'Year'}
                    dataKey={'year'}
                    cellDataGetter={cellDataGetter}
                    disableSort={false}
                    headerRenderer={headerRenderer}
                    width={100}
                  />
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
