"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // state зарлаж, анхны утга = 0

  return (
    <div className="p-6">
      <h1 className="text-2xl">Тоолуур: {count}</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
        onClick={() => setCount(count + 1)} // товч дарахад state нэмэгдэнэ
      >
        {" "}
        Нэмэх
      </button>
    </div>
  );
}
