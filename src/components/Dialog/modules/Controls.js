import React from 'react';

import flow from 'lodash-es/flow';
import isEmpty from 'lodash-es/isEmpty';
import flatten from 'lodash-es/flatten';

import { Subject } from 'rxjs/Subject';

import { filter, map } from 'utils/functional/currying';

import { createDialogComponent } from '../modules/DialogComponent';

export const CONTROLS_TYPES = [];
export const CONTROLS_TYPES_NAMES = ['Input', 'Checkbox'];
export const onlyControls = ({ type = NotAnInput }) =>
  CONTROLS_TYPES_NAMES.includes(type.name);

export const NotAnInput = (props) => {
  return (
    <div className="Dialog__Input--dummy">
      {props.children}
    </div>
  );
};

export const traverseDialog = (dialog) => {
  const traversedComponents = [];
  const traverse = (components) => {
    components.forEach((component) => {
      traversedComponents.push(component);
      if (!isEmpty(component.props.children)) {
        traverse(flatten([component.props.children]));
      }
    });
  };
  traverse(dialog.props.children);
  return traversedComponents;
};

// Dialog -> Array -> Array -> Array<DialogComponent>
export const dialogControls =
  flow([traverseDialog, filter(onlyControls), map(createDialogComponent)]);

/**
 * Testing
 */

class Just {
  value = void 0;
  static create(value) {
    return new Just(value);
  }
  constructor(value) {
    this.value = value;
  }
  bind(transform) {
    return transform(this.value);
  }
  toString() {
    return this.value;
  }
}

class Nothing {
  value = void 0;
  static create(value) {
    return new Nothing(value);
  }
  constructor(value) {
    this.value = value;
  }
  bind() {
    return this;
  }
  toString() {
    return Symbol('Nothing');
  }
}

const validate = (maybe) => {
  return maybe.bind((data) => {
    // if validation success
    return Just.create({ ...data, validate: true });
    // if not
    // return Nothing.create({ ...data, validate: true });
  });
};

const send = (maybe) => {
  return maybe.bind((data) => {
    return Nothing.create({ error: ['One', 'Two', 'Three'] });
  });
};

const email = (maybe) => {
  return maybe.bind((data) => {
    return Just.create({ ...data, email: true });
  });
};

// const submitFlow = flow([validate, handleValidation, send, handleRequest, email, handleEmailSending]);

const submitFlow = flow([validate, send, email]);
const isValid = submitFlow(Just.create({ hello: 'World!' }));
console.log(isValid.value);

// const condition = (value1) => (value2) => Just.create(6).bind(value2 => new Just(value + value2));
const result = Just.create(5).bind(value => Just.create(6).bind(value2 => new Just(value + value2)));
console.log(result);

const submit$$ = new Subject();


submit$$.next(validate);
submit$$.next(send);
submit$$.next(email);
