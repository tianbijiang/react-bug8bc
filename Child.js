import React from 'react';
import { connect } from 'react-redux';
import myAction from './myAction';
import irrelevantAction from './irrelevantAction';
import selector from './selector';
import anotherSelector from './anotherSelector';
import Context from './context';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeValueInterested: 0,
      storeValue3: 0,
    };
  }

  componentDidMount() {
    this.setState({
      storeValueInterested: this.props.finalDetails,
    });
    this.setState({
      storeValue3: this.props.value3FromRedux,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.finalDetails !== nextProps.finalDetails) {
      this.setState({
        storeValueInterested: nextProps.finalDetails,
      });
    }
    if (this.props.value3FromRedux !== nextProps.value3FromRedux) {
      this.setState({
        storeValue3: nextProps.value3FromRedux,
      });
    }
  }

  render() {
    return (
      <div>
        <br></br>
        Child {this.context.myProp ? "1" : "2"} reading from Redux value {this.context.myProp ? "1" : "2"}:

        {this.context.myProp && <div>
          <button onClick={() => {
            const storeValueInterested = parseInt(Math.random()*100);
            this.setState({ storeValueInterested });
            this.props.myAction({num: storeValueInterested, secReducer: false});
          }}>update redux store value {this.context.myProp ? "1" : "2"}</button>
          <button onClick={() => this.props.myAction({num: this.state.storeValueInterested, secReducer: false})}>
            resend same value
          </button>
          {this.state.storeValueInterested}
        </div>}

        {!this.context.myProp && <div>
          <button onClick={() => {
            const storeValueInterested = parseInt(Math.random()*100);
            this.setState({ storeValueInterested });
            this.props.myAction({num: storeValueInterested, secReducer: true});
          }}>update redux store value {this.context.myProp ? "1" : "2"}</button>
          <button onClick={() => this.props.myAction({num: this.state.storeValueInterested, secReducer: true})}>
            resend same value
          </button>
          {this.state.storeValueInterested}
        </div>}

        <div>
          <button onClick={() => {
            const storeValue3 = parseInt(Math.random()*100);
            this.setState({ storeValue3 });
            this.props.irrelevantAction({ num: storeValue3 })}
          }>update irrelevant redux store value</button>
          <button onClick={() => this.props.irrelevantAction({num: this.state.storeValue3})}>
            resend same value
          </button>
          {this.props.value3FromRedux}
        </div>
      </div>);
  }
}

// Option 1 working
// const mapStateToProps = () => {
//   const selectorInstance = selector();
//   return (state, props) => ({
//     finalDetails: selectorInstance(state, props.myProp),
//     value3FromRedux: state.value3FromRedux,
//   });
// }

// Option 2 not working
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(props.myProp)(state),
//   value3FromRedux: state.value3FromRedux,
// });

// Option 3 working
const mapStateToProps = (state, props) => ({
  finalDetails: selector(props.myProp)(state), // and end selector
  value3FromRedux: state.value3FromRedux,
});

// Option 4 not working
// const mapStateToProps = (state, props) => ({
//   finalDetails: selector(state, props.myProp),
//   value3FromRedux: state.value3FromRedux,
// });

const mapDispatchToProps = (dispatch) => ({
  myAction: (value) => dispatch(myAction(value)),
  irrelevantAction: (value) => dispatch(irrelevantAction(value)),
});

Child.contextType = Context;

export default connect(mapStateToProps, mapDispatchToProps)(Child);

