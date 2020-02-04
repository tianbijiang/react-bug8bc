import selector from './selector';
import { valueSelector } from './selector';
import { createSelector } from 'reselect';

// an intermediate selector
const anotherSelector = (myProp) => createSelector(
  [valueSelector(myProp)],
  (value) => {
    console.log("derived selector invoked");
    return `${value} is an ${value%2 ? 'odd' : 'even'} number`;
  }
);

export default anotherSelector;