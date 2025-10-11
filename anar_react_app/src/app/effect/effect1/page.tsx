"use client";
import { useEffect, useState } from "react";

export default function FetchUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // зөвхөн эхний удаа ажиллана

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((u) => ( <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
