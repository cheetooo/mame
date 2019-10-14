import React, { Component } from 'react';
export class Test extends Component{
    static defaultProps = {
    size: 30,
    width: null,
    height: null,
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    color: '#B9B9B9',
    viewSize: 18,
    className: 'icon',
    viewBox: null,
    title: "Title",
    desc: "Icon",
    label: null,
  }
  constructor(){
      super();
  }
  renderIcon(color) {
    console.log('hdjashdkjahdjasdjkhaskjdsadnjbsvjbasjkbcaksb')
    console.log(this.props)
    return this.props.children
  }
  componentWillMount() {
    console.log(this.props)
  }

  render(){
      return (
          <div style={{height:'100px',width:'100px',background:this.props.color}}>
            {this.renderIcon()}
          </div>
      )
  }
}

export class TT extends Test{
    static defaultProps = Object.assign({}, Test.defaultProps, {color:'red'})
    renderIcon(color) {
        console.log('321321321jdfsajflaknjk nkdlsankd')
        return (
            <div>
                321321321
            </div>
        )
     }
}

const withHOC = (wrappedComponent) => {
    return class HOC extends Component{
        constructor(){
            this.state = {
                name: '321'
            }
        }
        render(){
            return(
                <div>
                    <wrappedComponent name={this.state.name} />
                </div>
            )
        }
    }
}

class WrappedComponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                {this.props.name}
            </div> 
        )
    }
}


// export const Index = withHOC(WrappedComponent)

class HelloWorld extends React.Component {
    // constructor(){
    //     this.state = {
    //         text: ' 13213 '
    //     }
    // }
    render() {
      return this.props.text
    }
  }

  export const toUpperCaseHoc = function(WrappedComponent) {
    return class Hoc extends React.Component {
        // constructor(props){
        //     super(props)
        // }
      render() {
        const { text } = this.props;
        // console.log(this.props)
        const text2Upper = String.prototype.toUpperCase.call(text);
        return <WrappedComponent text={text2Upper} />;
      }
    };
  };

export const HelloWorld2Upper = toUpperCaseHoc(HelloWorld);