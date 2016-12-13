import { list as createList, map as createMap } from 'utils/immutable';

// additional cache manage? level up for all application?
// Maybe Redis cached state here? Something like fast cache/local, offline cache/etc...
// work with uri is here too
//
// If we will have multiple Storages - we can manipulate storage state from anywhere,
//    and have influence on next rendering of store. So, this structure is not simple cache, but
//    the connect point in managing different containers states
export class PageStateStorage {
  storage = createList([]);
  save(state) {
    this.storage = this.storage.push(createMap(state));
    return this;
  }
  last() {
    return this.storage.isEmpty() ? null : this.storage.last();
  }
  isEmpty() {
    return this.storage.isEmpty();
  }
}
