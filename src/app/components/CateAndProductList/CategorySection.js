"use client";

import { useEffect, useState } from "react";
import { primaryColor } from "../../../../color";
import CategoryList from "./CategoryList";

export default function CategorySection({ selectedCategory, fetchProduct }) {
  const [categoryData, setCategoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend.yeesto.com/getAllCategory"
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        const allCategories = [{ category: "All" }, ...data];
        setCategoryData(allCategories);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>Category</span>
        <span style={{ color: primaryColor, cursor: "pointer" }}>See all</span>
      </div>

      <CategoryList
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        fetchProduct={fetchProduct}
      />
    </div>
  );
}
