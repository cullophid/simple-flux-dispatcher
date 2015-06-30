'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var util = _interopRequireWildcard(_util);

exports['default'] = function () {
  var listeners = [];
  var isDispatching = false;
  var completedListeners = [];
  var dispatchArgs = undefined;
  var idCount = 0;

  return {
    register: register,
    dispatch: dispatch,
    unregister: unregister,
    waitFor: waitFor
  };

  function register(func) {
    if (listeners.some(function (x) {
      return x.func === func;
    })) return;
    var id = idCount += 1;
    listeners.push({
      func: func,
      id: id
    });
    return id;
  }

  function dispatch() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    dispatchArgs = args;
    isDispatching = true;
    listeners.forEach(callListener);
    isDispatching = false;
    completedListeners = [];
  }

  function callListener(listener) {
    if (completedListeners.some(function (x) {
      return x === listener;
    })) return;
    completedListeners.push(listener);
    listener.func.apply(null, dispatchArgs);
  }

  function unregister(id) {
    listeners = listeners.filter(function (x) {
      return x.id !== id;
    });
  }

  function waitFor(ids) {
    if (!isDispatching) throw new Error('waitFor must be called from a registered handler');
    if (!Array.isArray(ids)) ids = [ids];
    var listenersToComplete = listeners.filter(function (l) {
      return ids.some(function (id) {
        return id === l.id;
      });
    });
    listenersToComplete.forEach(callListener);
  }
};

module.exports = exports['default'];
