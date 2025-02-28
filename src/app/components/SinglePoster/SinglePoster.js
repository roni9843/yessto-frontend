import Image from "next/image";

export default function SinglePoster({ ImageLink }) {
  return (
    <div className="m-2">
      <div
        style={{
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <Image
            // unoptimized
            src={ImageLink} // Change to local image
            alt="Moto Logo"
            layout="responsive"
            width={100}
            height={100}
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
