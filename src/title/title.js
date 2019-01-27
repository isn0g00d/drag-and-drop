import React, { Component } from "react";

export default class TitleComponent extends Component {
  constructor() {
    super();
    this.state = {
      showIntro: true,
      default: false,
      customizable: false,
      inputValue: " "
    };
  }

  handleClick = what => {
    this.setState({ showIntro: false });

    what == 1
      ? this.setState({ default: true })
      : this.setState({ customizable: true });
  };

  updateInputValue = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  childFunctionHere() {
    this.props.someFunctionHere(this.state);
  }

  render() {
    return (
      <div onBlur={this.childFunctionHere.bind(this)}>
        {this.state.showIntro ? (
          <div>
            This is the title component. It can be default or customizable.
            Choose an option:
            <div>
              <button onClick={e => this.handleClick("1")}> Default </button>
              <button onClick={e => this.handleClick("2")}>Customizable</button>
            </div>
          </div>
        ) : null}

        {this.state.default ? <div> Some default string goes here .. </div> : null}
        {this.state.customizable ? (
          <div>
            <input
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
