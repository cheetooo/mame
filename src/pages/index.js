import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import About from './About'
import Setting from './Setting'
import Main from './Main'
import NotFound from './NotFound'

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
                    {/* <Route path="/ashbin" component={}/>
                    <Route path="/liked" component={}/>
                    <Route path="/login" component={}/>
                    <Route path="/MHz" component={}/>
                    <Route path="/mine" component={}/>
                    <Route path="/music/list" component={}/>
                    <Route path="/recent" component={}/> */}
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}