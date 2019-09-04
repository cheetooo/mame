import React from 'react'
import {Provider} from 'react-redux'
import store from './store/index'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {AnimatedSwitch,spring} from 'react-router-transition';
import Main from './pages/Main';
import Setting from './pages/Setting'
import './styles/index.css'

function mapStyles(styles) {
	return {
	  opacity: styles.opacity,
	  transform: `rotate(${styles.rotate}deg)`,
	};
  }

  function bounce(val) {
	return spring(val, {
	  stiffness: 100,
	  damping: 20,
	});
  }

  const bounceTransition = {
	// start in a transparent, uprotated state
	atEnter: {
	  opacity: 0,
	  rotate: 20,
	},
	// leave in a transparent, downrotated state
	atLeave: {
	  opacity: bounce(0),
	  rotate: bounce(-20),
	},
	// and rest at an opaque, normally-rotated state
	atActive: {
	  opacity: bounce(1),
	  rotate: bounce(0),
	},
  };

function App() {
    return (
        <Provider store={store}>
            <Router>
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
