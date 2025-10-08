import Image from "next/image";
import { photos } from "@/data/photos";

export default function GalleryPage() {
  return (
    <div>
      <h1>Photo Gallery</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {photos.map((photo) => (
          <div key={photo.id}>
            <Image
              src={photo.src}
              alt={photo.desc}
              width={300}
              height={200}
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
            <p>{photo.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
