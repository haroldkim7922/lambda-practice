import axios from "axios";

export function getTodos() {
  return axios.get(
    "https://alhmfr23j7.execute-api.us-east-1.amazonaws.com/dev/todos"
  );
}

export function postTodo(payload) {
  return axios.post(
    "https://alhmfr23j7.execute-api.us-east-1.amazonaws.com/dev/todos",
    payload
  );
}

export function deleteTodo(id) {
  return axios.delete(
    "https://alhmfr23j7.execute-api.us-east-1.amazonaws.com/dev/todos/" + id
  );
}
