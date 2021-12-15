import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Todocreate from "../todocreate/todocreate";
import Todoheader from "../todoheader/todoheader";
import Todolist from "../todolist/todolist";
import styles from "./todoContainer.module.css";

// const initialState = [
//   {
//     id: 1,
//     text: "이직하기(지금뿐이다)",
//     user: "hj",
//     done: false
//   },
//   {
//     id: 2,
//     text: "하루 8시간씩 공부하기",
//     user: "hj",
//     done: false
//   },
//   {
//     id: 3,
//     text: "스트레스 관리",
//     user: "hj",
//     done: true
//   },
//   {
//     id: 4,
//     text: "충분한 수면",
//     user: "hj",
//     done: true
//   }
// ];

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
        });
        setTodos(result);
      });
      return () => stopSync();
    },
    [userId, todoRepository]
  );

  useEffect(
    () => {
      console.log("location:", location);

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

  const onCreateTodo = todoToCreate => {
    console.log("createTodo:", todoToCreate);
    setTodos(todos => {
      const updated = { ...todos };
      updated[todoToCreate.id] = todoToCreate;
      return updated;
    });
    todoRepository.saveTodo(userId, todoToCreate);
  };

  const onEditTodo = todoToEdit => {
    console.log("editedTodo:", todoToEdit);
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
    console.log("deleteTodo:", todoToDel);
    setTodos(todos => {
      return todos.filter(todo => todo.id !== todoToDel.id);
    });
    todoRepository.removeTodo(userId, todoToDel);
  };

  const onChecked = changedCheckbox => {
    console.log("onChecked: ", changedCheckbox);
    setTodos(todos => {
      return todos.map(
        todo =>
          todo.id === changedCheckbox.id
            ? {
                ...todo,
                done: !todo.done
              }
            : todo
      );
    });
    todoRepository.saveTodo(userId, changedCheckbox);
  };

  return (
    <div className={styles.container}>
      <Todoheader userId={userId} authService={authService} />
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
