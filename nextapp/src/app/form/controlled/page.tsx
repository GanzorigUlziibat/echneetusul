"use client";
import { useState } from "react";
export default function ControlledForm() {
  const [username, setUsername] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${username}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      ​
      <input
        value={username}
        onChange={(e) => {
          console.log(username);
          setUsername(e.target.value);
        }}
        placeholder="Enter username"
      />
      ​<button type="submit">Submit</button>​
    </form>
  );
}
