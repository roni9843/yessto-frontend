import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { blackColor, redColor, whiteColor } from "../../../../color";

export default function ProductListUiComponent() {
  const router = useRouter();

  const AllProduct = useSelector((state) => state.users.AllProduct);

  return (
    <div>
      <div>
        <div className="row mx-0 px-0">
          {AllProduct.map((p) => (
            <div
              onClick={() => router.push(`/product/${p._id}`)}
              key={p}
              className="col-6 col-md-4 col-lg-2 mt-3"
            >
              <div>
                <div
                  className=""
                  style={{
                    width: "100%",
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
                      className="d-flex "
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
                          src={p.images[0]}
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
                                    p.productRegularPrice *
                                      (p.productOffer / 100)
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
                              <span
                                className="mx-1"
                                style={{ fontSize: "13px" }}
                              >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
