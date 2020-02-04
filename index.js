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

import Context from './context';

// reuse reducer
const rootReducer = combineReducers({
  value1FromRedux: reducerCreator(myReducer, false),
  value2FromRedux: reducerCreator(myReducer, true),
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
            store.dispatch(myAction({num: parseInt(Math.random()*100), secReducer: false}));
          }}>update redux store value 1</button>
        </div>

        <div>
          <button onClick={() => {
            store.dispatch(myAction({num: parseInt(Math.random()*100), secReducer: true}));
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
          <Context.Provider value={{myProp: true}}>
            <Child myProp={true} />
          </Context.Provider>
          {this.state.child2 && <Context.Provider myProp={false} value={{myProp: false}}><Child /></Context.Provider>}
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));