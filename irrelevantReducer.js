export default function(state=0, action) {
  switch(action.type) {
    case 'UPDATE_IRRELEVANT_VALUE':
      return action.payload.num;
    default:
      return state;
  }
}