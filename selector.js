import { createSelector } from 'reselect';
import { memoize } from 'lodash';

// Option 1 working
// const valueSelector = (state, myProp) => {
//   return myProp ? state.value1FromRedux : state.value2FromRedux;
// };
// const selector = () => createSelector(
//   [valueSelector],
//   value => {
//     console.log("selecting " + value);
//     return value;
//   }
// );

// Option 2 not working
// const value1Selector = (state) => state.value1FromRedux;
// const value2Selector = (state) => state.value2FromRedux;
// const selector = memoize((myProp) => createSelector(
//   [value1Selector, value2Selector],
//   (value1, value2) => {
//     const value = myProp ? value1 : value2;
//     console.log("selecting " + value);
//     return value;
//   }
// ));

// Option 3 working
export const valueSelector = (myProp) => (state) => {
  return myProp ? state.value1FromRedux : state.value2FromRedux;
};
// an end selector
const selector = memoize((myProp) => createSelector(
  [valueSelector(myProp)],
  (value) => {
    console.log("selecting " + value);
    return value;
  }
));

// Option 4 not working
// const valueSelector = (state, myProp) => {
//   return myProp ? state.value1FromRedux : state.value2FromRedux;
// };
// const selector = createSelector(
//   [valueSelector],
//   value => {
//     console.log("selecting " + value);
//     return value;
//   }
// );

export default selector;