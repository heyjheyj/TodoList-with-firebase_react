import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Todocreate from "../todocreate/todocreate";
import Todoheader from "../todoheader/todoheader";
import Todolist from "../todolist/todolist";
import styles from "./todoContainer.module.css";

const TodoContainer = ({ authService, todoRepository }) => {
  const [todos, setTodos] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(location && location.state.id);

  useEffect(
    () => {
      if (!userId) {
        return;
      }
      const stopSync = todoRepository.syncTodos(userId, todos => {
        const result = [];
        Object.keys(todos).map(key => {
          result.push(todos[key]);
          return result;
        });
        setTodos(result);
      });
      return () => stopSync();
    },
    [userId, todoRepository]
  );

  useEffect(
    () => {
      authService.onAuthChange(user => {
        if (user) {
          setUserId(user.uid);
        } else {
          navigate("/");
        }
      });
    },
    [authService, userId, navigate]
  );

  const onLogout = useCallback(
    () => {
      authService.logout();
      if (!userId) {
        navigate("/");
      }
    },
    [authService, navigate, userId]
  );

  const onCreateTodo = todoToCreate => {
    setTodos(todos => {
      const updated = { ...todos };
      updated[todoToCreate.id] = todoToCreate;
      return updated;
    });
    todoRepository.saveTodo(userId, todoToCreate);
  };

  const onEditTodo = todoToEdit => {
    setTodos(todos => {
      const updated = todos.map(
        todo =>
          todo.id === todoToEdit.id ? { ...todo, text: todoToEdit.text } : todo
      );
      return updated;
    });
    todoRepository.saveTodo(userId, todoToEdit);
  };

  const deleteTodo = todoToDel => {
    setTodos(todos => {
      return todos.filter(todo => todo.id !== todoToDel.id);
    });
    todoRepository.removeTodo(userId, todoToDel);
  };

  const onChecked = checkedTodo => {
    setTodos(todos => {
      const updated = todos.map(
        todo =>
          todo.id === checkedTodo.id
            ? { ...todo, done: checkedTodo.done }
            : todo
      );
      return updated;
    });
    todoRepository.saveTodo(userId, checkedTodo);
  };

  return (
    <div className={styles.container}>
      <Todoheader onLogout={onLogout} />
      {todos &&
        <Todolist
          todos={todos}
          deleteTodo={deleteTodo}
          editTodo={onEditTodo}
          onChecked={onChecked}
        />}
      <Todocreate user={userId} onCreateTodo={onCreateTodo} />
    </div>
  );
};

export default TodoContainer;
