import faker from 'faker';
import uuid from 'uuid';

const year = (min, max) => () => Math.floor((Math.random() * (max - min)) + min).toString();
export const FIELDS = [
  ['index', uuid],
  ['artist', faker.name.findName],
  ['song', faker.name.findName],
  ['genre', faker.address.city],
  ['year', year(1990, 2016)],
];
export const FULL_LIST_SIZE = 1000;
export const FILTER_FIELDS = ['artist', 'genre', 'year'];
export const DISPLAY_ROWS_LIST = [5, 10, 20, 50];
