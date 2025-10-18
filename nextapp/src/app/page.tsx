"use client";
import React from "react";
import { CustomB, CustomB1 } from "@/components/customButton";
import { useState } from "react";

export default function page() {
  const [name, setName] = useState("Mandakh");
  function changeName(param: string) {
    setName(param);
  }

  return (
    <div>
      HELLO WORLD
      <CustomB text="blue" color="green" />
      {/* <CustomB1 text="yellow" /> */}
      <p>{name}</p>
      <button onClick={() => changeName("Ganzo")}> UURCHIL </button>
    </div>
  );
}
