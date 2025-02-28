"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ProductCarousel({ images }) {
  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <Carousel
        showThumbs={true}
        dynamicHeight={true}
        autoPlay={true}
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        autoFocus={true}
      >
        {images.images.map((image) => (
          <div
            key={image}
            style={{ position: "relative", paddingBottom: "100%", height: 0 }}
          >
            <Image
              // unoptimized
              src={image}
              alt="Product image"
              layout="fill"
              objectFit="contain"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
