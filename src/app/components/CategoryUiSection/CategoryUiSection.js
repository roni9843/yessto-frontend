import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CategoryUiSection() {
  const router = useRouter();

  const allCategory = useSelector((state) => state.users.filterCategory);

  return (
    <div className="px-2">
      <div>
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>Categories</span>
      </div>
      <div
        className="d-flex  mx-2"
        style={{
          overflowX: "auto",
          overflowY: "hidden",

          position: "relative",
        }}
      >
        {allCategory &&
          allCategory.map((c) => (
            <div
              onClick={() => router.push(`/category/${c.category.category}`)}
              key={c}
            >
              <div
                className="m-2"
                style={{
                  height: "60px",
                  width: "60px",
                  position: "relative",
                  borderRadius: "5px",
                  boxShadow: "rgb(40 40 40 / 10%) -4px 4px 10px 0px",
                  borderRadius: "5px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "80%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    color: "black", // Use a string value for the color
                    fontSize: "7px",
                    fontWeight: "normal",
                  }}
                >
                  {c.category.category}
                </span>
                <Image
                  // unoptimized
                  src={c.category.image} // Change to local image
                  alt="Moto Logo"
                  layout="responsive"
                  width={100}
                  height={100}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
