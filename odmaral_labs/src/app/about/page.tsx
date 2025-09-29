import React from "react";
import styles from "./page.module.css";

import Header from "@/component/header";

export default function About() {
  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold">Миний тухай</h2>
        <p>Next.js ашиглаж байна.</p>
      </main>
    </>
  );
}
