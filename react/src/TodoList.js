import React, { Component } from "react";
import "./TodoList.css";
import Todo from "./Components/Todo";
import { getTodos, postTodo, deleteTodo } from "./service";

class TodoList extends Component {
  state = {
    itemCount: 0,
    uncheckedCount: 0,
    todos: [],
    task: ""
  };

  componentDidMount() {
    this.getTodos();
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      let uncheckedTasks = 0;

      if (todos.length > 0) {
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].complete) {
            uncheckedTasks++;
          }
        }
        this.setState({
          uncheckedCount: uncheckedTasks,
          itemCount: todos.length
        });
      } else {
        this.setState({ itemCount: 0, uncheckedCount: 0 });
      }
    }
  }

  getTodos = () => {
    getTodos()
      .then(response => {
        console.log("from aws: ", response.data);
        this.setState({
          todos: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  addNewTask = () => {
    const { task, todos } = this.state;

    postTodo({ body: task })
      .then(response => {
        console.log("from aws POST: ", response);
        let taskObj = {
          id: response.data.id,
          body: response.data.body,
          complete: response.data.complete
        };
        this.setState({
          todos: [...todos, taskObj]
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.resetForm();
  };

  handleTaskComplete = (id, val) => {
    this.setState(previousState => {
      let todos = [...previousState.todos];
      let indexOfTodo = todos.findIndex(todo => todo.id === id);

      todos[indexOfTodo] = {
        ...todos[indexOfTodo],
        complete: val
      };

      return { todos };
    });
  };

  handleRemoveTask = id => {
    const { todos } = this.state;
    const newArr = todos.filter(todo => {
      if (todo.id !== id) return todo;
    });
    this.setState({ todos: newArr });
    deleteTodo(id)
      .then(response => {
        console.log("from aws DELETE: ", response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  resetForm = () => {
    this.setState({
      task: ""
    });
  };
  render() {
    const { itemCount, uncheckedCount, task, todos } = this.state;
    return (
      <div className="container center">
        <h3 className="center title">My TODO App</h3>
        <div className="flow-right controls">
          <span>Item count: {itemCount}</span>
          <span>Unchecked count: {uncheckedCount}</span>
        </div>
        <button
          className="button center"
          data-toggle="modal"
          data-target="#addTodo"
        >
          New TODO
        </button>
        <div
          className="modal fade"
          id="addTodo"
          role="dialog"
          aria-labelledby="addTodoTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addTodoTitle">
                  New TODO
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.resetForm()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>What do you need to do?</label>
                    <input
                      type="text"
                      className="form-control"
                      name="task"
                      value={task}
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.resetForm()}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.addNewTask()}
                >
                  Add TODO
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="todo-list">
          {todos.length > 0 &&
            todos.map(todo => (
              <Todo
                key={todo.id}
                info={todo}
                handleTaskComplete={this.handleTaskComplete}
                handleRemoveTask={this.handleRemoveTask}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
