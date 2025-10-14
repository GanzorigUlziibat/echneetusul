"use client";
import { useEffect, useState } from "react";

export default function NameSaver() {
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("name");
    if (saved) setName(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("name", name);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <h2>Hello, {name || "Guest"}!</h2>
    </div>
  );
}