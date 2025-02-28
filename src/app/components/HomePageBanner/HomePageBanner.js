import Image from "next/image";

export default function HomePageBanner() {
  return (
    <div className="row mt-1 mx-0 mb-2">
      <div className="mt-3">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Image
              src="/image_banner.png" // ✅ Use absolute path starting from /public
              alt="Moto Logo"
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9ImJsdWUiIC8+PC9zdmc+"
              loading="lazy"
              priority={false}
              quality={75}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
