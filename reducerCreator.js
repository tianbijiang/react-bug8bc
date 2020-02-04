// purpose: to reuse value1Reducer.js
export default function(reducerFunction, secReducer, reducerName) {
  return (state, action) => {
    reducerFunction.reducerName = reducerName;
    if (state === undefined) {
      return secReducer ? "default2" : "default1";
    }

    const source =
      action.secReducer ||
      (action.payload && action.payload.secReducer) ||
      false;
    if (secReducer && source) {
      const inputState = state;
      const newState = reducerFunction(inputState, action);
      if (inputState !== newState) {
        return newState;
      }
    }

    if (!source && secReducer === false) {
      return reducerFunction(state, action);
    }

    return state;
  };
}
