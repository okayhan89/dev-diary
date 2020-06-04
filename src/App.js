import React from 'react';
import logo from './logo.svg';
// import './App.css';
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";
// import sanitizeHtml from "sanitize-html";

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
      editable: true,
      tag: ""
    };
  }
  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  blur = () => {
    console.log("hi");
    console.log(this.tag);

    if(this.tag.includes("--")){
      console.log("hihighi");
      this.setState({html: ''});
    }

    this.tag="";
  }
  keydown = evt => {
    console.log( evt.key );
    this.tag+=evt.key;
  }
  input= () =>{
    console.log("hi");
    // console.log(evt.target.value);
  }

  

  render = () => {
    return (
      <div>
        <div contenteditable="true" id="contactForm"></div>
        <hr></hr>

        <h3>editable contents</h3>
        <ContentEditable
          className="editable"
          tagName="pre"
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.state.editable} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onBlur={this.blur}
          onKeyDown={this.keydown}
          // dangerouslySetInnerHTML={{}}
          // onInput={this.input}
          // onBlur={this.sanitize}
        />
        <h3>source</h3>
        <textarea
          className="editable"
          value={this.state.html}
          onChange={this.handleChange}
          // onBlur={this.sanitize}
        />
        <h3>actions</h3>
        <EditButton cmd="italic" />
        <EditButton cmd="bold" />
        <EditButton cmd="formatBlock" arg="h1" name="heading" />
        <EditButton
          cmd="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        />
        <button onClick={this.toggleEditable}>
          Make {this.state.editable ? "readonly" : "editable"}
        </button>
      </div>
    );
  };
};
export default App;