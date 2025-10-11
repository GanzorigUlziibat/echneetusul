import public from "@/app";

export default function GalleryPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Gallery</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Image src="file.svg" alt="" width={300} height={200}/>
        <Image src="globe.svg" alt="" width={300} height={200} />
        <Image src="next" alt="" width={300} height={200} />
      </div>
    </div>
  );
}
