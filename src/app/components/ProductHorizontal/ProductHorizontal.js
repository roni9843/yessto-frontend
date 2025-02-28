import Image from "next/image";

import { useRouter } from "next/navigation";
import styles from "./ProductHorizontal.module.css"; //

export default function ProductHorizontal({ title, p }) {
  const router = useRouter();

  return (
    <div>
      <div className={styles.titleContainer}>
        <hr className={styles.titleLine} />
        <span className={styles.titleText}>{title}</span>
        <hr className={styles.titleLine} />
      </div>

      <div
        className="row m-0 p-0 "
        style={{ marginTop: "10px", padding: "0px", margin: "0px" }}
      >
        {p &&
          p.products.map(
            (p, index) =>
              p.productLive === true && (
                <div
                  key={index}
                  className="col-6 col-md-4 col-lg-3 col-xl-2"
                  style={{
                    padding: "10px",
                  }}
                >
                  <div
                    className={styles.productCard}
                    onClick={() => router.push(`/product/${p._id}`)}
                  >
                    <div className={styles.imageContainer}>
                      <Image
                        src={p.images[0]}
                        alt={p.productName}
                        layout="responsive"
                        width={200}
                        height={200}
                        style={{
                          width: "100%",
                          height: "auto",
                          // borderRadius: "10px 10px 0px 0px",
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9ImJsdWUiIC8+PC9zdmc+" // Lightweight blue placeholder
                        loading="lazy" // (default for non-priority images, but good to add explicitly)
                        priority={false} // Set to true only for above-the-fold images
                        quality={75} // Adjust quality for smaller image sizes
                      />

                      <div className={styles.quickViewOverlay}>QUICK VIEW</div>
                    </div>
                    <div className={styles.productInfo}>
                      <h5 className={styles.productName}>{p.productName}</h5>

                      <div className={styles.priceContainer}>
                        {p.productOffer > 0 ? (
                          <div>
                            <span>
                              ৳
                              {(
                                p.productRegularPrice.toFixed(2) *
                                (1 - p.productOffer / 100)
                              ).toFixed(2)}
                            </span>
                            <span className={styles.originalPrice}>
                              ৳{p.productRegularPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>৳{p.productRegularPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
}
