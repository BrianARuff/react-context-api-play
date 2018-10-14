import React, { Component } from "react";
import "./App.css";

const ThemeContext = React.createContext("light");

class App extends Component {
  state = {
    currentColor: "dark",
    alterColor: () =>
      this.state.currentColor === "dark"
        ? this.setState({ currentColor: "light" })
        : this.setState({ currentColor: "dark" })
  };
  render() {
    return (
      <ThemeContext.Provider value={{state: this.state}}>
        <Toolbar context={this.state} />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar(props) {
  const bgColor = props.context.currentColor === 'dark' ? 'green' : 'purple';
  console.log(bgColor);
  return (
    <div onClick={props.context.alterColor} style={{background: bgColor, height: '100vh', width: '100vw' }}>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {context => <Button {...props} context={context.state} />}
    </ThemeContext.Consumer>
  );
}

function Button(props) {
  const lightButton = {
    background: "gray",
  };
  const darkButton = {
    background: "black",
    color: "white",
  };
  const buttonSpecs = {
    width: '100px',
    padding: '10px 20px',
    border: '1px solid black',
    borderRadius: '3px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
  return (
    <button onClick={() => {
      props.context.alterColor()
    }} style={props.context.currentColor === 'dark' ? {...darkButton, ...buttonSpecs} : {...lightButton, ...buttonSpecs}}>
      Theme
    </button>
  );
}
export default App;
