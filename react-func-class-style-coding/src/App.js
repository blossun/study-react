import React, {useState} from 'react';
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

function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0]; //state값
  var setNumber = numberState[1]; //함수가 담긴다. 이 함수를 통해서 number의 값을 변경할 수 있다.

  console.log('numberState', numberState);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random()); //setNumber라는 변수가 가리키는 함수의 인자로 변경하려는 새로운 값을 넘겨주면 된다.
          }
        }></input>
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.initNumber}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;