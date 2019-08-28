import React, {createContext, useReducer} from 'react';
import Container from './pages/index'
import {reducers} from './reducer'
import ReactDOM from 'react-dom';

const RootContext = createContext()
export {RootContext}

function App() {
  const reducer = useReducer(reducers, reducers())
  console.log(reducer)
  return (
    <RootContext.Provider value={reducer}>
      <Container/>
    </RootContext.Provider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));