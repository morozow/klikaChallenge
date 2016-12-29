import React, { Component, PropTypes } from 'react';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { last as last$ } from 'rxjs/operator/last';
import { filter as filter$ } from 'rxjs/operator/filter';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

import eq from 'lodash-es/eq';
import isUndefined from 'lodash-es/isUndefined';
import assign from 'lodash-es/assign';

import { map } from 'utils/immutable';

export class BaseFormControl extends Component {

  state = {
    // current value of control
    value: void 0,

    // validation record { isValid: [true | false], error: [void 0 | validation error] }
    isValid: true,
  };

  settings = map({
    validator: (value) => {
      return value.length > 5;
    },
    name: void 0,
    label: void 0,
  });

  // Validation management
  validation$$;
  validation$$subscriber;

  // Value management
  value$$;
  value$$subscriber;

  // Events handling
  event$$;
  event$$subscriber;

  constructor(props) {
    super(props);

    // update default settings
    this.settings = this.settings
      .set('name', props.name, 'undefined')
      .set('label', props.label, void 0);
  }

  componentDidMount() {
    const { settings } = this;

    this.value$$ = new BehaviorSubject(this.state.value);
    const value$$subscriber = this.value$$
      ::filter$((originalValue) => !isUndefined(originalValue))
      ::distinctUntilChanged()
      .subscribe((originalValue) => {
        // parse, format original event value
        this.validation$$.next(originalValue);

        // send original value to collector. Maybe need to parse, format, etc...
        this.context.collector$$.next(this.collectorValue(originalValue));
        this.setState({ value: originalValue });
      });

    this.event$$ = new Subject();
    const event$$subscriber = this.event$$
      ::filter$((event) => eq(event.type, 'change'))
      .subscribe((event) => {
        this.value$$.next(event.target.value);
      });

    this.validation$$ = new Subject();
    const validation$$subscriber = this.validation$$.subscribe((value) => {
      this.setState({ isValid: settings.get('validator')(value) });
    });

    assign(this, {
      event$$subscriber,
      value$$subscriber,
      validation$$subscriber,
    });
  }

  componentWillUnmound() {
    this.value$$subscriber.unsubscribe();
    this.event$$subscriber.unsubscribe();
    this.validation$$subscriber.unsubscribe();
  }

  collectorValue(value) {
    return { name: this.settings.get('name'), value };
  }

  validate() {
    this.validation$$.next(this.value$$::last$());
  }

  render() {
    return (
      <DummyControl/>
    );
  }
}

BaseFormControl.propTypes = {
  name: PropTypes.any.isRequired,
  label: PropTypes.any,
};

BaseFormControl.contextTypes = {
  collector$$: PropTypes.any.isRequired,
  collector$$subscriber: PropTypes.any.isRequired,
};

/**
 * Dummy Control Component
 */
class DummyControl extends Component {
  render() {
    return (
      <div className="Dialog__Input--dummy">{'Dummy Control'}</div>
    );
  }
}
