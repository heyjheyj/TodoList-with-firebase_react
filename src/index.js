import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { firebaseApp } from "./service/firebase";
import AuthService from "./service/auth";

import TodoRepository from "./service/todoRepository";

const todoRepository = new TodoRepository(firebaseApp);
const authService = new AuthService(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} todoRepository={todoRepository} />
  </React.StrictMode>,
  document.getElementById("root")
);
