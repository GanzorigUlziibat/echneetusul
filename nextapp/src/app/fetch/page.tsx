"use client"; //CSR
import { useState, useEffect } from "react";
export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      //   console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Алдаа:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-gray-500">Ачаалж байна...</p>;

  return (
    <div className="p-6">
      ​<h1 className="text-2xl font-bold mb-4">Хэрэглэгчдийн жагсаалт</h1>​
      <ul className="space-y-2">
        ​
        {users.map((u) => (
          <li key={u.id} className="p-3 border rounded-md shadow-sm">
            ​<p className="font-semibold">{u.name}</p>​<p>{u.email}</p>​
            <p className="text-sm text-gray-600">{u.company.bs}</p>​
          </li>
        ))}
        ​
      </ul>
      ​
    </div>
  );
}
