"use client";
import { useState } from "react";

export default function Greeting() {
  const [name, setName] = useState(""); // state = хэрэглэгчийн нэр

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Нэрээ оруулна уу"
        className="border p-2"
        value={name} // input утга state-тай холбоотой
        onChange={(e) => setName(e.target.value)} // бичихэд state шинэчлэгдэнэ
      />
      <p className="mt-2">Сайн уу, {name || "хэрэглэгч"}!</p>
    </div>
  );
}
