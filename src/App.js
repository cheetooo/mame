import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index'
import { HashRouter,Route } from 'react-router-dom';
import Main from './pages/Main';
import Setting from './pages/Setting'

function App() {
  return (
    <Provider store={store}>
        <HashRouter>
            <Route exact path="/"  component={Main}/>
            <Route path="/setting" component={Setting}/>
        </HashRouter>
    </Provider>
  )
}

export default App;
