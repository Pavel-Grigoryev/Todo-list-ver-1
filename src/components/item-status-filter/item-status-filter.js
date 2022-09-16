import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {

  constructor() {
    super();
    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'done', label: 'Done' },
    ];
  }


  render() {

    const { filter, onFilterChange } = this.props;

    const buttonRender = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button type="button" className={`btn ${clazz}`}
          key={name}
          onClick={() => onFilterChange(name) }
        >{label}</button>
      );
      })
    return (
      <div className="btn-group item-status-filter">
       {buttonRender}        
      </div>
    );
  }
}



