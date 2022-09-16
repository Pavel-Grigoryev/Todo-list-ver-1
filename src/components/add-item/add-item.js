import React, { Component } from "react";

import './add-item.css';

export default class AddItem extends Component {

   constructor(props) {
      super(props);
      this.state = {
         label: ''
      }
      this.onLabelChange = (e) => {
         this.setState({
            label: e.target.value
         })
      };

      this.onSubmit = (e) => {
         e.preventDefault();
         this.props.onItemAdded(this.state.label);
         this.setState(
            { 
               label: ''
            }
         )
      }; 
   }

   render() {      
      
      return (
         <form className="d-flex add-item"
            onSubmit={this.onSubmit}
         >           
            <input type="text"
               className="fom-control add-item__input"
               onChange={this.onLabelChange}
               placeholder="What needs to be done"
               value={this.state.label}
            ></input>
            <button className="add-item__btn btn btn-outline-primary">
               Add Item
            </button>
         </form>
      );
   }
}

