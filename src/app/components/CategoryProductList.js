"use client";

import { useSelector } from "react-redux";
import ProductHorizontal from "./ProductHorizontal/ProductHorizontal";

export default function CategoryProductList() {
  const filterCategory = useSelector((state) => state.users.filterCategory);

  return (
    <div>
      {filterCategory.map((p) => (
        <ProductHorizontal
          key={p}
          title={p.category.category}
          p={p}
        ></ProductHorizontal>
      ))}
    </div>
  );
}
