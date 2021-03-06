import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

var funcStyle = 'color:blue';
var funcId = 0;

function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0]; //state값
  var setNumber = numberState[1]; //함수가 담긴다. 이 함수를 통해서 number의 값을 변경할 수 있다.

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0]; //date가 키워드일 수 있기때문에 변수명을 _date로 함
  // var setDate = dateState[1];

  var [_date, setDate] = useState((new Date()).toString());

  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount) '+(++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect return (componentWillUnMount) '+(++funcId), funcStyle);
    }
  }, []);

  //side effect
  useEffect(function(){
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function(){
    console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = _date;
    return function(){
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [_date]);

  console.log('%cfunc => render' +(++funcId), funcStyle);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
        function () {
          setNumber(Math.random()); //setNumber라는 변수가 가리키는 함수의 인자로 변경하려는 새로운 값을 넘겨주면 된다.
        }
      }></input>
      <input type="button" value="date" onClick={
        function () {
          setDate((new Date()).toString());
        }
      }></input>
    </div>
  );
}

var classStyle = 'color:red';

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString
  }

  componentWillMount(){
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true; // render 호출 여부를 반환
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate', classStyle);
  }

  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function () {
            this.setState({ number: Math.random() })
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function () {
            this.setState({ date: (new Date()).toString() })
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;