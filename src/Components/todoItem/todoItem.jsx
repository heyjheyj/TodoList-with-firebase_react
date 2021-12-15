import React, { useState, useRef } from "react";
import styles from "./todoItem.module.css";

const TodoItem = ({ todo, deleteTodo, editTodo, onChecked }) => {
  // console.log("todo: ", todo);

  const textRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todo.text);

  let checked = false;

  const onEdit = () => {
    setEditMode(true);
    console.log("changed text: ", text);
    if (text) {
      const updated = {
        id: todo.id,
        text: text,
        user: todo.user,
        done: todo.done
      };
      editTodo(updated);
    }
  };

  const onChangeText = e => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onDelete = () => {
    deleteTodo(todo);
  };

  const onToggle = () => {
    onChecked(todo);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        onDelete();
      } else onEdit();
      setEditMode(false);
    }
  };

  const onBlur = e => {
    console.log(e.currentTarget);
    e.preventDefault();
    if (e.currentTarget.value === "") {
      onDelete();
    } else {
      onEdit();
    }
    setEditMode(false);
  };

  return (
    <ul className={styles.items}>
      <li className={styles.item}>
        <section className={styles.contents}>
          {todo.done === false
            ? <input
                className={styles.checkbox}
                type="checkbox"
                checked={false}
                onChange={onToggle}
              />
            : <input
                className={styles.checkbox}
                type="checkbox"
                checked={true}
                onChange={onToggle}
              />}
          {editMode === true
            ? <input
                type="text"
                onKeyPress={handleKeyPress}
                onChange={onChangeText}
                defaultValue={todo.text}
                className={styles.textInput}
                onBlur={onBlur}
                autoFocus
              />
            : <span ref={textRef}>
                {todo.text}
              </span>}
        </section>
        <section className={styles.buttons}>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </section>
      </li>
    </ul>
  );
};

export default TodoItem;
