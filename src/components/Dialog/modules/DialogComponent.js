import { record } from 'utils/immutable';

import { Subject } from 'rxjs/Subject';

const DialogComponentRecord = record({
  control: void 0,
  validation$$: void 0,
});

export class DialogComponent extends DialogComponentRecord {
  static create(...args) {
    return new DialogComponent(...args);
  }

  static get empty() {
    return DialogComponent.create();
  }

  constructor(...args) {
    const context = super(...args);
    return context;
  }

}

export const createDialogComponent = (control) => {
  const validation$$ = new Subject();
  validation$$.subscribe(({ value }) => {
    control.validate(value);
  });

  return DialogComponent.create({
    control,
    validation$$,
  });
};

