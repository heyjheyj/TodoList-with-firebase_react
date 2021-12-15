import styles from "./app.module.css";
import React from "react";
import TodoContainer from "./Components/todoContainer/todoContainer";
import Login from "./Components/login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App({ todoRepository, authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService} />} />
          <Route
            path="/todolist"
            element={
              <TodoContainer
                authService={authService}
                todoRepository={todoRepository}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
