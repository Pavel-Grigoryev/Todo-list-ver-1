import React, {
   Component
} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item/add-item";

import "./app.css";

export default class App extends Component {
   constructor() {
      super();
      this.maxId = 100;
      this.state = {
         todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
         ],
         searchText: '',
         filter: 'all'
      };

      this.deleteItem = (idItem) => {
         this.setState(({
            todoData
         }) => {
            const idx = todoData.findIndex((el) => el.id === idItem);
            const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
               todoData: newArr,
            };
         });
      };

      this.addItem = (text) => {
         const newItem = {
            label: text,
            important: false,
            id: this.maxId++,
         };

         this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
               todoData: newArr,
            };
         });
      };

      this.onToggleImportant = (idItem) => {
         this.setState(({ todoData }) => {
            return {
               todoData: this.toggleProperty(todoData, idItem, 'important'),
            };
         })
         
      };

      this.onToggleDone = (idItem) => {
         this.setState(({ todoData }) => {
            return {
               todoData: this.toggleProperty(todoData, idItem, 'done')
            }
            
         })
      };

      this.onSearchItem = (text) => {
         this.setState(
            { searchText: text }
         )        
      };

      this.onFilterChange = (filter) => {
         this.setState(
            { filter: filter }
         )        
      };


   }
   
   search = (items, text) => {
      if (text.length === 0) {               
         return items;
      }
      return items.filter(item => {            
         return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
   }

   filterItem(items, filter) {
      switch (filter) {
         case 'all':
            return items;
         case 'active':
            return items.filter(item => !item.done);
         case 'done':
            return items.filter(item => item.done);      
         default:
            return items;
      }
   }
   
   createTodoItem(label) {
      return {
         label,
         important: false,
         done: false,
         id: this.maxId++,
      };
   };

   toggleProperty(arr, idItem, propName) {

      const idx = arr.findIndex((el) => el.id === idItem);

      // 1 Update object 
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      
      // 2 Construct new array
      const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

      return newArr;
   }

   render() {

      const { todoData, searchText, filter } = this.state;

      const visibleItems = this.filterItem(this.search(todoData, searchText), filter);

      const doneCount = todoData.filter((el) => el.done).length;

      const todoCount = todoData.length - doneCount;

      return (
         <div className="todo-app" >
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex" >
               < SearchPanel
                  onSearchItem={this.onSearchItem}
               />
               < ItemStatusFilter filter={filter}
                  onFilterChange={this.onFilterChange}
               />
            </div>
            <TodoList
               todos={visibleItems}
               onDeleted={this.deleteItem}
               onToggleImportant={this.onToggleImportant}
               onToggleDone={this.onToggleDone}
            />
            < AddItem onItemAdded={this.addItem} />
      </div>
      );
   }
}
