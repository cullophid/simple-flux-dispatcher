'use strict';

export function any (func, list) {
  for(let i = 0; i < list.length; i += 1) {
    if (func(list[i])) {
      return true;
    }
  }
  return false;

}

export function contains (element, list) {
  return any((x)=> x === element, list);
}
