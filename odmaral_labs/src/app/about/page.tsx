import React from "react";
import styles from "./page.module.css";

import Header from "@/component/header";

export default function About() {
  <div className={styles.container}>
    <header className={styles.header}>
      <h1 className={styles.title}>Миний тухай</h1>
      <p className={styles.subtitle}>Намтар, боловсрол, хобби</p>
    </header>

    <section className={styles.card}>
      <h2>Намтар</h2>
      <div className={styles.grid}>
        <div>
          <div className={styles.muted}>Төрсөн он</div>
          <div className={styles.value}>1996 он</div>
        </div>
        <div>
          <div className={styles.muted}>Төрсөн газар</div>
          <div className={styles.value}>Улаанбаатар, Монгол</div>
        </div>
      </div>
    </section>

    <section className={styles.card}>
      <h2>Боловсрол</h2>
      <ul className={styles.list}>
        <li>2002–2012: 20-р Сургууль </li>
        <li>2012–2016: Мандах Бүртгэл Дээд Сургууль – Нягтлан Бодогч</li>
        <li>2012–2016: Мандах Их Сургууль – Магитср</li>
      </ul>
    </section>

    <section className={styles.card}>
      <h2>Хобби</h2>
      <div className={styles.badges}>
        {["Унших", "Аялах", "Хоол", "Кино"].map((h) => (
          <span key={h} className={styles.badge}>
            {h}
          </span>
        ))}
      </div>
    </section>
  </div>;
}
