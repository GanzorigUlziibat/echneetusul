import React from "react";
import styles from "./page.module.css";

export default function About() {
  return (
    <div>
      <h1 className={styles.title}>Миний тухай</h1>
      <p className={styles.description}>
        Энэ хуудсыг CSS Module ашиглаж загварчилсан.
      </p>
    </div>
  );
}
