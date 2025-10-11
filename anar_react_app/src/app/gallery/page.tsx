import Link from "next/link";
import Image from "next/image";
import { photos } from "@/data/photos";

export default function GalleryPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gallery</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {photos.map((p) => (
          <Link key={p.id} href={`/gallery/${p.id}`}>
            <Image src={p.src} alt={p.desc} width={300} height={200} />
          </Link>
        ))}
      </div>
    </div>
  );
}
