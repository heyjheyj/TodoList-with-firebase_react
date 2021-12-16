import React, { memo } from "react";
import styles from "./todoheader.module.css";

const today = new Date();
let dateString = today.toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

const Todoheader = memo(({ Logout }) => {  
  console.log('header');
  
  const onLogout = () => {
      Logout();
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
});

export default Todoheader;
