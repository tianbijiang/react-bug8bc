import React, { Component } from 'react';
import { render } from 'react-dom';
import Child from './Child';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import irrelevantAction from './irrelevantAction';
import irrelevantReducer from './irrelevantReducer';

import myAction from './myAction';
import myReducer from './myReducer';
import reducerCreator from './reducerCreator';

// reuse reducer like this
const rootReducer = combineReducers({
  value1FromRedux: reducerCreator(myReducer, 1),
  value2FromRedux: reducerCreator(myReducer, 2),
  value3FromRedux: irrelevantReducer,
});
const store = createStore(rootReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeValue3: parseInt(Math.random()*100),
      child2: false,
    };
  }
  
  render() {
    return (
      <div>
        <div>
          <button onClick={() => {
            store.dispatch(myAction({num: parseInt(Math.random()*100), variation: 1}));
          }}>update redux store value 1</button>
        </div>

        <div>
          <button onClick={() => {
            store.dispatch(myAction({num: parseInt(Math.random()*100), variation: 2}));
          }}>update redux store value 2</button>
        </div>

        <div>
          <button onClick={() => {
            const storeValue3 = parseInt(Math.random()*100);
            this.setState({ storeValue3 });
            store.dispatch(irrelevantAction({num: storeValue3 }))}
          }>update irrelevant redux store value</button>
          {this.props.value3FromRedux}
        </div>

        <div><button onClick={() => this.setState({child2: !this.state.child2})}>toggle child2</button></div>

        <div>
          <Child myProp={true} value={{myProp: true}} />
          {this.state.child2 && <Child myProp={false} value={{myProp: false}}  />}
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));