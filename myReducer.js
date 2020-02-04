export default function(state, action) {
  switch(action.type) {
    case 'UPDATE':
      return action.payload.num;
    default:
      return state;
  }
}