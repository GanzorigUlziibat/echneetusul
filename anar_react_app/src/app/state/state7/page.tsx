"use client";
import { useState } from "react";

export default function UserCard() {
  const [user, setUser] = useState({ name: "Ганзориг", age: 39 });

  const increaseAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Нас: {user.age}</p>
      <button onClick={increaseAge}>Нас нэмэх</button>
    </div>
  );
}
