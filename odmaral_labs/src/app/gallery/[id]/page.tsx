import { notFound } from "next/navigation";
import Image from "next/image";
import { photos } from "@/data/photos"; // Adjust path if needed

export default function PhotoDetail({ params }: { params: { id: string } }) {
  const photo = photos.find((p) => p.id === parseInt(params.id));

  if (!photo) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
      <Image
        src={photo.src}
        alt={photo.alt}
        title={photo.title}
        width={1200}
        height={900}
        className="w-full h-auto object-cover mb-6"
      />
      <p className="text-lg mb-4">{photo.detailedDescription}</p>
      <a href="/gallery" className="text-blue-500 hover:underline">
        Буцах
      </a>
    </div>
  );
}
