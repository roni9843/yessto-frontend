import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function DiscoverMoreTitle() {
  return (
    <div className="mt-5">
      <div
        style={{ textAlign: "center", fontSize: "16px", fontWeight: "normal" }}
      >
        Discover more
      </div>
      <div
        style={{ textAlign: "center", fontSize: "16px", fontWeight: "bolder" }}
      >
        Product
      </div>
      <div
        style={{ textAlign: "center", fontSize: "16px", fontWeight: "bolder" }}
      >
        <KeyboardDoubleArrowDownIcon />
      </div>
    </div>
  );
}
