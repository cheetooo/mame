import React from 'react'
import {Provider} from 'react-redux'
import store from './store/index'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AnimatedSwitch, spring} from 'react-router-transition';
import Main from './pages/Main';
import Setting from './pages/Setting'
import Audio from './pages/Audio/index'
import './styles/index.css'

function mapStyles(styles) {
    return {opacity: styles.opacity, transform: `rotate(${styles.rotate}deg)`};
}

function bounce(val) {
    return spring(val, {
        stiffness: 100,
        damping: 20
    });
}

const bounceTransition = {
    atEnter: {
        opacity: 0,
        rotate: 20
    },
    atLeave: {
        opacity: bounce(0),
        rotate: bounce(-20)
    },
    atActive: {
        opacity: bounce(1),
        rotate: bounce(0)
    }
};

function App() {

    return (
        <Provider store={store}>
            <Router>
                <Audio/>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                    className="switch-wrapper">
                    <Route exact path="/" component={Main}/>
                    <Route path="/setting" component={Setting}/>
                </AnimatedSwitch>
            </Router>
        </Provider>
    )
}

export default App;
