import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import About from './About'
import Setting from './Setting'
import Main from './Main'

export default class Container extends Component{
    constructor(){
        super();
    }
    render(){
        return(   
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Main}/>
                    <Route path="/about" component={About}/>
                    <Route path="/setting" component={Setting}/>
                </Switch>
            </BrowserRouter>
        )
    }
}