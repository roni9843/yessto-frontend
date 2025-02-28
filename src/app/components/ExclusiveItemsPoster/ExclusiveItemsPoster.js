import Image from "next/image";

export default function ExclusiveItemsPoster() {
  // https://i.ibb.co/j5qL4Y5/Group-7.png
  // https://i.ibb.co/k5FqtBB/Group-8.png
  // https://i.ibb.co/PjdWjzZ/Group-10.png
  // https://i.ibb.co/vzJHF40/Group-9.png

  return (
    <div className="p-2 mt-3">
      <div>
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          Exclusive Items
        </span>
      </div>
      <div className="p-1">
        <div className="row">
          <div className="col-6 col-md-3 col-lg-3  py-2">
            <Image
              // unoptimized
              src="https://i.ibb.co/j5qL4Y5/Group-7.png" // Change to local image
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
          <div className="col-6 col-md-3 col-lg-3 py-2">
            <Image
              // unoptimized
              src="https://i.ibb.co/k5FqtBB/Group-8.png" // Change to local image
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
          <div className="col-6 col-md-3 col-lg-3 py-2">
            <Image
              // unoptimized
              src="https://i.ibb.co/PjdWjzZ/Group-10.png" // Change to local image
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
          <div className="col-6 col-md-3 col-lg-3 py-2">
            <Image
              // unoptimized
              src="https://i.ibb.co/vzJHF40/Group-9.png" // Change to local image
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
        </div>
      </div>
    </div>
  );
}
