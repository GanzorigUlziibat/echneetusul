"use client";
import { useState } from "react";

export default function DarkMode() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
      minHeight: "100vh", textAlign: "center", padding: "20px"
    }}>
      <h1>{dark ? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={() => setDark(!dark)}>Toggle Mode</button>
    </div>
  );
}