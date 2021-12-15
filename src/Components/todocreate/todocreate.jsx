import React, { useRef, useState } from "react";
import styles from "./todocreate.module.css";

const Todocreate = ({ onCreateTodo, user }) => {
  const textRef = useRef();
  const formRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    if (textRef.current.value === "") {
      return;
    } else {
      const todo = {
        id: Date.now(),
        text: textRef.current.value,
        done: false,
        user: user
      };
      formRef.current.reset();
      onCreateTodo(todo);
      console.log(todo);
    }
  };

  return (
    <form className={styles.inputfield} ref={formRef} onSubmit={onSubmit}>
      <input
        autoFocus
        ref={textRef}
        placeholder="Input Something.."
        className={styles.input}
      />
      <button onSubmit={onSubmit} className={styles.submit}>
        +
      </button>
    </form>
  );
};

export default Todocreate;
