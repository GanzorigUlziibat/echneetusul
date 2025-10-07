import Image from "next/image";
import React from "react";
import Layout from "@/component/layout";

export default function Home() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold">Нүүр хуудас</h2>
      <p className="mt-4">Энэ бол Layout ашигласан жишээ.</p>
    </Layout>
  );
}
