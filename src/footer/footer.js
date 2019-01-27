import React, { Component } from "react";

export default class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputFirstName: "",
      inputStoreName: ""
    };
  }

  updateInputValue = (evt, which) => {
    which == "firstName"
      ? this.setState({ inputFirstName: evt.target.value })
      : this.setState({ inputStoreName: evt.target.value });
  };

  childFunctionHere() {
    this.props.someFunctionHere(this.state);
  }

  render() {
    return (
      <div onBlur={this.childFunctionHere.bind(this)}>
        <div>
          Kind Regards,
          <div>
            {" "}
            <input
              value={this.state.inputValueFirstName}
              onChange={evt => this.updateInputValue(evt, "firstName")}
            />
          </div>
          <div>
            {" "}
            <input
              value={this.state.inputValueStoreName}
              onChange={evt => this.updateInputValue(evt, "storeName")}
            />{" "}
          </div>
        </div>
      </div>
    );
  }
}
