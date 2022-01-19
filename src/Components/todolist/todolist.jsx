import React from "react";
import styles from "./todolist.module.css";
import TodoItem from "../todoItem/todoItem";

const Todolist = ({ todos, deleteTodo, editTodo, onChecked }) => {
  return (
    <div className={styles.container}>
      <section className={styles.todolist}>
        <span className={styles.lists}>
          해야할 일 :
          {todos.length > 0
            ? todos.filter(todo => todo.done === false).length
            : ""}{" "}
          / 끝낸 일 :
          {todos.length > 0
            ? todos.filter(todo => todo.done === true).length
            : ""}
        </span>
      </section>
      <section className={styles.listContainer}>
        {todos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            onChecked={onChecked}
          />
        )}
      </section>
    </div>
  );
};

export default Todolist;
