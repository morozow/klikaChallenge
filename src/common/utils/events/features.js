import eq from 'lodash-es/eq';

export const clickFeature = (eventProxy: Proxy) => eq(eventProxy.type, 'click');
export const doubleClickFeature = (eventProxy) => eq(eventProxy.type, 'dblclick');
export const focusFeature = (eventProxy) => eq(eventProxy.type, 'focus');
export const blurFeature = (eventProxy) => eq(eventProxy.type, 'blur');
export const keydownFeature = (eventProxy) => eq(eventProxy.type, 'keydown');
export const keypressFeature = (eventProxy) => eq(eventProxy.type, 'keypress');
export const changeFeature = (eventProxy) => eq(eventProxy.type, 'change');