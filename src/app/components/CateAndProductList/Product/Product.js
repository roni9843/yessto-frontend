"use client";

import Image from "next/image";
import Link from "next/link";

export default function Product({ product }) {
  return (
    <div
      className="col-6 col-sm-6 col-md-4 col-lg-2"
      style={{ padding: "10px" }}
    >
      <Link style={{ textDecoration: "none" }} href={`/product/${product._id}`}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "100%",
          }}
        >
          <Image
            // unoptimized
            src={product.images[0]}
            alt="this is image"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div className="d-flex justify-content-between">
            <span style={{ color: "gray" }}>{product.productName}</span>
            <span>⭐ 5</span>
          </div>
          <div>
            <span style={{ color: "black", fontWeight: "bold" }}>
              {product.productRegularPrice}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
