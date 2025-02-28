// /category/[category]/page.js

import SingleCategoryProductList from "./CategoryProductList";

export default function Page({ params }) {
  const { category } = params;

  return (
    <div>
      <SingleCategoryProductList
        category={category}
      ></SingleCategoryProductList>
    </div>
  );
}

// // Move generateStaticParams here
// export async function generateStaticParams() {
//   const categories = ["WATCHES", "electronics", "furniture"]; // Example categories

//   return categories.map((category) => ({
//     category,
//   }));
// }

// This function will be called during build time to generate static pages
export async function generateStaticParams() {
  // Fetch product IDs from your API or database
  // const response = await fetch(
  //   "https://elec-ecommerce-back.vercel.app/getAllProductIds"
  // );
  // const productIds = await response.json();
  const response = await fetch(
    "https://backend.yeesto.com/getAllCategoryName"
    //"https://backend.yeesto.com/getAllCategoryName"
  );
  const names = await response.json();

  // // console.log(names, " < ---- category");

  // const productIds = ["6680289ac3db9318d1e53041", "66802d3fc3db9318d1e53049"];

  // Return an array of params objects with each `productId`
  return names.name.map((name) => ({
    category: name,
  }));

  // const categories = ["WATCHES", "electronics", "furniture"]; // Example categories

  // return categories.map((category) => ({
  //   category,
  // }));
}
