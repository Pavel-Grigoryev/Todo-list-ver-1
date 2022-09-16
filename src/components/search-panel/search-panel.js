import React, { Component } from "react";

import './search-panel.css';

export default class SearchPanel extends Component {

  constructor() {
    super();
    this.state = {
      searchText: ''
    };

    this.onSearchChange = (e) => {
      console.log(e.target.value);
       this.setState({
         searchText: e.target.value
       });
      
       this.props.onSearchItem(e.target.value);
    }

  }
  render() {
    return (
      <input
        placeholder="search"
        className="search-input form-control"
        value={this.state.searchText}
        onChange={this.onSearchChange}
      ></input>);
  }

};
 