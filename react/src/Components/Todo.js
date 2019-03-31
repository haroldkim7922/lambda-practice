import React from "react";

const Todo = props => (
  <div
    className={
      props.info.complete ? "alert alert-success" : "alert alert-warning"
    }
  >
    <div className="row">
      <div className="col-1">
        <input
          type="checkbox"
          className="mr-2"
          onChange={e => {
            props.handleTaskComplete(props.info.id, e.target.checked);
          }}
        />
      </div>
      <div className="col-7">
        <div>{props.info.body}</div>
      </div>
      <div className="col-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.handleRemoveTask(props.info.id)}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default Todo;
