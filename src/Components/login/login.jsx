import React, { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const navigate = useNavigate();

  const goTodolist = useCallback(
    userId => {
      navigate("/todolist", {
        state: { id: userId }
      });
    },
    [navigate]
  );

  useEffect(
    () => {
      authService.onAuthChange(user => {
        user && goTodolist(user.uid);
      });
    },
    [authService, goTodolist]
  );

  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => {
        goTodolist(data.user.uid);
      });
  };

  return (
    <section className={styles.login}>
      <h1 className={styles.text}>Login</h1>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button className={styles.loginbtn} onClick={onLogin}>
            Google
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Login;
