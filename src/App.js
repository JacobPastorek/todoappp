import React from 'react';
import ListItem from './ListItem';
import { Animated } from "react-animated-css";
import { FiAlertTriangle, FiEdit3, FiPlus } from 'react-icons/fi';

import './App.scss';


class App extends React.Component {

  state = {
    toDoList: [],
    todo: {
      name: '',
      text: '',
      date: null,
      done: false,
      isVisible: true,
    },
    isEmpty: false,
    isEmptyEdit: false,
    currentTodoId: '',
    isEditing: false,
  }


  changeNameInTodo = (e) => {
    const newTodo = { ...this.state.todo };
    newTodo.name = e;
    newTodo.date = new Date();
    this.setState({ todo: newTodo })
  }

  changeTextInTodo = (e) => {
    const newTodo = { ...this.state.todo };
    newTodo.text = e;
    newTodo.date = new Date();
    this.setState({ todo: newTodo })
  }


  addToList = () => {
    const newTodo = { ...this.state.todo };
    if (newTodo.name === '' || newTodo.text === '') {
      this.setState({ isEmpty: true })
    } else {
      this.setState({ isEmpty: false })
      let updatedList = [...this.state.toDoList];
      updatedList.push(this.state.todo);
      this.setState({ toDoList: updatedList });

      newTodo.name = '';
      newTodo.text = '';
      this.setState({ todo: newTodo })
    }
  }

  makeDone = (id) => {
    const currentItem = this.state.toDoList[id];
    if (currentItem.done === true) {
      currentItem.done = false;
    } else {
      currentItem.done = true;
    }
    this.setState({ currentItem: currentItem })
  
  }

  deleteItemHandler = (id) => {
    if (this.state.isEditing) {
      return;
    } else {
      const newArray = [...this.state.toDoList];
      const currentItem = this.state.toDoList[id];
      currentItem.isVisible = false;
      this.setState({ currentItem: currentItem })
      if (currentItem.isVisible === false) {
        setTimeout(
          function () {
            newArray.splice(id, 1);
            this.setState({ toDoList: newArray });
          }.bind(this), 1000
        );
      }
    }
  }

  editTodoNow = (id) => {
    const currentItem = this.state.toDoList[id];
    const actualTodo = { ...this.state.todo };
    const current = { ...currentItem };

    actualTodo.name = current.name;
    actualTodo.text = current.text;

    this.setState({ todo: actualTodo })
    this.setState({ currentTodoId: id })
    this.setState({ isEditing: true });

  }

  editList = () => {

    if (this.state.currentTodoId !== '') {

      const actualTodo = { ...this.state.todo };

      if (actualTodo.name === '' || actualTodo.text === '') {
        this.setState({ isEmptyEdit: true })
        return;
      } else {
        let itemIde = this.state.currentTodoId;
        const toDoLister = [...this.state.toDoList];
        const helloKitty = toDoLister[itemIde];

        helloKitty.name = actualTodo.name
        helloKitty.text = actualTodo.text

        this.setState({ toDoList: toDoLister })
        this.setState({ currentTodoId: '' })

        actualTodo.name = ''
        actualTodo.text = ''
        this.setState({ todo: actualTodo })

     
        this.setState({ isEditing: false });
        this.setState({ isEmptyEdit: false })
      }




    } else {
      return;
    }
  }


  render() {

    let MakeRain = '';
    if (this.state.toDoList.length > 0) {

      MakeRain = <ul>
        {this.state.toDoList.map((todo, id) => {
          return <ListItem
            classes={todo.done ? "checked" : null}
            name={todo.name}
            animation={todo.isVisible}
            deleter={() => this.deleteItemHandler(id)}
            editer={() => this.editTodoNow(id)}
            text={todo.text}
            date={todo.date.toLocaleString()}
            key={todo.date}
            clicker={() => this.makeDone(id)} />
        })}
      </ul>;

    } else {
      MakeRain = <div className="empty_list"><p><FiEdit3 /></p>Make some Todos.</div>
    }


    return (
      <div className="App">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-6 left_side">
              <div className="left_side">
                {this.state.isEditing ? <h1><span>Edit</span> Todo</h1> : <h1><span>Add</span> Todo</h1>}
                <div>
                  <input type="text" placeholder="*Name" onChange={event => this.changeNameInTodo(event.target.value)} value={this.state.todo.name} />
                  <textarea onChange={event => this.changeTextInTodo(event.target.value)} type="text" placeholder="*Text" value={this.state.todo.text} />
                  {this.state.isEditing ? <button onClick={this.editList}><FiEdit3 /></button> : <button onClick={this.addToList}><FiPlus /></button>}
                  {this.state.isEmpty ? <Animated animationIn="bounceIn"><p className="alert"><FiAlertTriangle className="alert_icon" />Please fill up both inputs</p> </Animated> : null}
                  {this.state.isEmptyEdit ? <Animated animationIn="bounceIn"><p className="alert"><FiAlertTriangle className="alert_icon" />Don't do empty fields</p> </Animated> : null}
                </div>

              </div>
            </div>
            <div className="col-md-6 right_side">
              <div>
                {MakeRain}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;