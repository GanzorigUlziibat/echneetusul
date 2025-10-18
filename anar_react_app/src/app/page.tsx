import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
  
   <div>
    <h1>Hello World</h1>
    <p>Anar's first app</p>
    <Users />
    <Contact />
   </div>

  );
}

export function Users() {
  return (
   <div>
    <Link href="/">Энэ бол Лаб5-ын даалгавар</Link>
   </div>
  );
}

export function Contact() {
  return (
   <div>
    <Link href="/">Энэ бол Лаб5-ын даалгавар</Link>
   </div>
  );
}
