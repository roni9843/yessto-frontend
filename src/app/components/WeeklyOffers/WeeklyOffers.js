import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import {
  blackColor,
  redColor,
  whiteColor,
  whiteColor_v_3,
} from "../../../../color";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function WeeklyOffers() {
  const router = useRouter();

  const allOfferProduct = useSelector(
    (state) => state.users.filterOfferProduct
  );

  return (
    <div>
      <div
        className="d-flex px-2 mt-3"
        style={{ justifyContent: "space-between" }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          Weekly Offers
        </span>
        <span
          onClick={() => router.push(`/weeklyOffers`)}
          style={{ fontSize: "10px" }}
        >
          View All <KeyboardArrowRightIcon style={{ fontSize: "16px" }} />
        </span>
      </div>

      <div
        className=" d-flex  "
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          position: "relative",
        }}
      >
        {allOfferProduct &&
          allOfferProduct.map((p, index) => (
            <div key={index} onClick={() => router.push(`/product/${p._id}`)}>
              <div
                className="mt-2 px-2 py-4"
                style={{
                  backgroundColor: whiteColor_v_3,
                  marginLeft: index === 0 ? "25px" : "0px",
                  borderRadius: index === 0 ? "5px 0px 0px 5px" : "0px",
                  width: "150px",
                }}
              >
                <div
                  className="p-2"
                  style={{
                    backgroundColor: whiteColor,
                    borderRadius: "5px",
                    boxShadow: "rgb(40 40 40 / 25%) 0px 2px 3px 0px",
                  }}
                >
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        className="text-xs text-md-sm text-lg-base"
                        style={{ color: redColor }}
                      >
                        {p.productOffer > 0 && `-${p.productOffer}% OFF`}
                      </span>
                    </div>
                    <div>
                      <FavoriteBorderIcon style={{ fontSize: "12px" }} />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Image
                        // unoptimized
                        src={p.images[0]} // Change to local image
                        alt="Moto Logo"
                        layout="responsive"
                        width={100}
                        height={100}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {p.productName}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div style={{ display: "flex" }}>
                        {p.productOffer > 0 ? (
                          <div>
                            <span style={{ fontSize: "13px" }}>
                              €
                              {Math.round(
                                p.productRegularPrice -
                                  p.productRegularPrice * (p.productOffer / 100)
                              )}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span style={{ fontSize: "10px" }}>
                              €{p.productRegularPrice}
                            </span>
                          </div>
                        )}

                        <div>
                          {p.productOffer > 0 && (
                            <span className="mx-1" style={{ fontSize: "13px" }}>
                              {" "}
                              <del>€{p.productRegularPrice}</del>
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span
                          className="p-1 px-3"
                          style={{
                            color: whiteColor,
                            backgroundColor: blackColor,
                            borderRadius: "20px",
                            textAlign: "center",
                            fontSize: "7px",
                          }}
                        >
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
