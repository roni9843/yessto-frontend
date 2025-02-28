"use client";
import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import Product from "./Product/Product";

export default function CateAndProductList() {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  const fetchProduct = async (category) => {
    try {
      const response = await fetch("https://backend.yeesto.com/getProduct", {
        method: "POST",
        body: JSON.stringify({ category }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products: ", error);
    }
  };

  useEffect(() => {
    fetchProduct(selectedCategory);
  }, []);

  return (
    <div className="mt-2 mx-3">
      <CategorySection
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        fetchProduct={fetchProduct}
      />

      <div className="row d-flex justify-content-center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
