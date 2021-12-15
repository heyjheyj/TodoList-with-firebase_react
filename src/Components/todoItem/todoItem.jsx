import React, { useState, useRef } from "react";
import styles from "./todoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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

  const onToggle = e => {
    console.log("onToggle", e);
    if (text) {
      const updated = {
        id: todo.id,
        text: text,
        user: todo.user,
        done: !todo.done
      };
      onChecked(updated);
    }
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
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={todo.done}
            onChange={onToggle}
          />
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
          <button onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} className={styles.edit} />
          </button>
          <button onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashAlt} className={styles.trash} />
          </button>
        </section>
      </li>
    </ul>
  );
};

export default TodoItem;
