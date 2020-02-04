// reuse myReducer.js
export default function(reducerFunction, variation, reducerName) {
  const Wrapper = (state, action) => {
    if (state === undefined) return "default"; // defaultState can vary depending on each variation/your use case

    // TODO: check if this block is needed
    if (variation !== action.payload.variation) {
      return state;
    }

    if (variation && action.payload.variation) {
      // reuse the original reducer
      const newState = reducerFunction(state, action);

      // do necessary modifications for each use case
      switch (action.payload.variation) {
        case 1:
          newState = "Hello " + newState;
          break;
        case 2:
          newState = "Bye " + newState;
          break;
        default:
          break;
      }
      if (state !== newState) {
        return newState;
      }
      return state;
    }
    return reducerFunction(state, action);
  };
  Wrapper.reducerName = reducerName;
  return Wrapper;
}
