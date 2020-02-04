import { createContext } from 'react';

// context can't be accessed from within mapStateToProps. This is useless

const defaultValue = {
    myProp: false,
};

const Context = createContext(defaultValue);

export default Context;
