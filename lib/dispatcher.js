'use strict';
import * as util from './util';

export default function () {
  let listeners = [];
  let isDispatching = false;
  let completedListeners = [];
  let dispatchArgs;

  return {
    register,
    dispatch,
    unregister,
    waitFor
  };

  function register (func) {
    if (listeners.some((x) => x.func === func)) return;
    let id = listeners.length;
    listeners.push({
      func,
      id,
    });
    return id;
  }

  function dispatch (...args) {
    dispatchArgs = args;
    isDispatching = true;
    listeners.forEach(callListener);
    isDispatching = false;
    completedListeners = [];
  }

  function callListener (listener) {
    if(completedListeners.some((x) => x === listener)) return;
    completedListeners.push(listener);
    listener.func.apply(null, dispatchArgs);
  }

  function unregister (id) {
    listeners = listeners.filter((x) => x.id !== id);
  }

  function waitFor (ids) {
    if(!isDispatching) throw new Error('waitFor must be called from a registered handler');
    if(!Array.isArray(ids)) ids = [ids];
    let listenersToComplete = listeners.filter((l)=> {
      return ids.some((id) => id === l.id);
    });
    listenersToComplete.forEach(callListener);

  }
}
