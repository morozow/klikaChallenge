import faker from 'faker';
import uuid from 'uuid';

const year = (min, max) => () => Math.floor((Math.random() * (max - min)) + min).toString();

// [[ name, label, fakeDataFunction, columnWidth ]]
export const FIELDS = [
  ['index', 'Index', uuid, 100],
  ['artist', 'Artist', faker.name.findName, 200],
  ['song', 'Song', faker.name.findName, 250],
  ['genre', 'Genre', faker.address.city, 150],
  ['year', 'Year', year(1990, 2016), 100],
];
export const FULL_LIST_SIZE = 1000;
export const FILTER_FIELDS = ['artist', 'genre', 'year'];
export const DISPLAY_ROWS_LIST = [5, 10, 20, 50];
export const PAGINATION_LUFT = 3;
