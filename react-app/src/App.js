import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  getReadContent() {
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents
        this.max_content_id += 1;
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:newContents, // 새롭게 만든 데이터로 교체
          mode:'read', //글 생성 후, 읽기모드로 전환
          selected_content_id:this.max_content_id //새로 작성한 글의 id값으로 지정
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>;
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        //어느 대상을 업데이트할 것인지에 대한 식별자값 _id를 받아서 해당하는 content를 변경
        var newContents = Array.from(this.state.contents);
        var i = 0;
        while (i < newContents.length) {
          if (newContents[i].id === _id) {
            newContents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i++;
        }
        this.setState({
          contents:newContents, // 새롭게 만든 데이터로 교체
          mode:'read' //글 수정 후, 읽기모드로 전환
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }

  render() {
    console.log('App render');
    
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC
          onChangePage={function (id) {
            //debugger;
            this.setState({ 
              mode: 'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1); //배열의 i번째부터 1개 원소를 삭제
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
