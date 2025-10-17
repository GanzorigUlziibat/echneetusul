"use client";
import { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? "Унтраах" : "Асаах"}
      </button>
      <p>Төлөв: {isOn ? "Асаалттай" : "Унтраалттай"}</p>
    </div>
  );
}