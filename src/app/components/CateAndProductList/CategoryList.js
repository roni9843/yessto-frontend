"use client";

import { useState } from "react";

export default function CategoryList({
  categoryData,
  selectedCategory,
  fetchProduct,
}) {
  const [selectCategoryData, setSelectCategoryData] =
    useState(selectedCategory);

  return (
    <div
      className="d-flex"
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        padding: "10px 0",
      }}
    >
      {categoryData && categoryData.length > 0 ? (
        categoryData.map((category, index) => (
          <button
            key={index}
            className={`btn rounded-pill m-2 ${
              selectCategoryData === category.category
                ? "btn-success"
                : "btn-outline-success"
            }`}
            style={{
              fontSize: "14px",
              padding: "5px 10px",
              fontWeight: "bold",
            }}
            onClick={() => {
              setSelectCategoryData(category.category);

              if (category.category === "All") {
                fetchProduct("All");
              } else {
                fetchProduct(category._id);
              }
            }}
          >
            {category.category}
          </button>
        ))
      ) : (
        <span>No categories available</span>
      )}
    </div>
  );
}
