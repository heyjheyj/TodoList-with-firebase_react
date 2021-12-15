import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./todoheader.module.css";

const today = new Date();
let dateString = today.toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

const Todoheader = ({ userId, authService }) => {
  const navigate = useNavigate();
  
  const onLogout = () => {
    authService.logout();
    if (!userId) {
      navigate('/')
    }
  };

  return (<>
    <header className={styles.header}>
      <h2 className={styles.title}>
        {dateString}
      </h2>
      <button className={styles.logout} onClick={onLogout}>
       Logout
      </button>
    </header>
    <p className={styles.day}>
    {dayName}
    </p>
    </>
  );
};

export default Todoheader;
