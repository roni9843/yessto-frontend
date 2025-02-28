// import Head from "next/head";
// import { whiteColor_v_2 } from "../../../../color";
// import SingleProductPageReduxWrapped from "./SingleProductPageReduxWrapped";

// // This function will be called during build time to generate static pages
// export async function generateStaticParams() {
//   // Fetch product IDs from your API or database
//   // const response = await fetch(
//   //   "https://elec-ecommerce-back.vercel.app/getAllProductIds"
//   // );
//   // const productIds = await response.json();
//   const response = await fetch(
//     "https://elec-ecommerce-back.vercel.app/getAllProductId"
//   );
//   const productIds = await response.json();
//   // const productIds = ["6680289ac3db9318d1e53041", "66802d3fc3db9318d1e53049"];

//   // Return an array of params objects with each `productId`
//   return productIds.productIds.map((id) => ({
//     productId: id,
//   }));
// }

// // export async function generateStaticParams() {
// //   // Return an empty array to indicate that no pages should be statically generated
// //   return ["66802d3fc3db9318d1e53049"];
// // }

// export default async function Page({ params }) {
//   const { productId } = params;

//   let productData = null;
//   let error = null;

//   try {
//     const response = await fetch(
//       "https://elec-ecommerce-back.vercel.app/getProductById",
//       {
//         method: "POST",
//         body: JSON.stringify({ productId: productId }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching product data: ${response.statusText}`);
//     }

//     productData = await response.json();
//   } catch (err) {
//     error = err.message;
//     console.error("Failed to fetch product data:", error);
//   }

//   if (!productData) {
//     return (
//       <div>
//         <title>Product Not Found - E-commerce Site</title>
//         <p>{error ? error : "Product not found."}</p>
//       </div>
//     );
//   }

//   const description = productData.productDescription
//     .replace(/<\/p>/g, "\n") // Replace closing </p> tags with newlines
//     .replace(/<[^>]+>/g, "") // Remove all other HTML tags
//     .trim(); // Trim any leading/trailing whitespace

//   const keywords = productData.productTag.join(", ");

//   return (
//     <div style={{ backgroundColor: whiteColor_v_2 }}>
//       <Head>
//         <title>{productData.productName} - E-commerce Site</title>
//         <meta property="og:title" content={productData.productName} />
//         <meta name="keywords" content={keywords} />
//         <meta property="og:image" content={productData.images[0]} />
//         <meta property="og:description" content={description} />
//       </Head>
//       <div>
//         <SingleProductPageReduxWrapped productData={productData} />
//       </div>
//     </div>
//   );

//   // (Render your product page here)
// }

// // export default async function Page({ params }) {
// //   const { productId } = params;

// //   let productData = null;
// //   let error = null;

// //   try {
// //     const response = await fetch(
// //       "https://elec-ecommerce-back.vercel.app/getProductById",
// //       {
// //         method: "POST",
// //         body: JSON.stringify({ productId: productId }),
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error(`Error fetching product data: ${response.statusText}`);
// //     }

// //     productData = await response.json();
// //   } catch (err) {
// //     error = err.message;
// //     console.error("Failed to fetch product data:", error);
// //   }

// //   if (!productData) {
// //     return (
// //       <div style={{ backgroundColor: whiteColor_v_2 }}>
// //         <Head>
// //           <title>Product Not Found - E-commerce Site</title>
// //         </Head>
// //         <p>{error ? error : "Product not found."}</p>
// //       </div>
// //     );
// //   }

// //   const description = productData.productDescription
// //     .replace(/<\/p>/g, "\n") // Replace closing </p> tags with newlines
// //     .replace(/<[^>]+>/g, "") // Remove all other HTML tags
// //     .trim(); // Trim any leading/trailing whitespace

// //   const keywords = productData.productTag.join(", ");

// //   return (
// //     <div style={{ backgroundColor: whiteColor_v_2 }}>
// //       <Head>
// //         <title>{productData.productName} - E-commerce Site</title>
// //         <meta property="og:title" content={productData.productName} />
// //         <meta name="keywords" content={keywords} />
// //         <meta property="og:image" content={productData.images[0]} />
// //         <meta property="og:description" content={description} />
// //       </Head>
// //       <div>
// //         <SingleProductPageReduxWrapped productData={productData} />
// //       </div>
// //     </div>
// //   );
// // }

// ? =========================================================

import { whiteColor_v_2 } from "../../../../color";
import SingleProductPageReduxWrapped from "./SingleProductPageReduxWrapped";

// Mock function to simulate fetching all product IDs.
// Replace this with a real API call to fetch all product IDs you want to statically generate.
async function fetchAllProductIds() {
  // Example: Fetch from your API
  const response = await fetch("https://backend.yeesto.com/getAllProductId");
  const productIds = await response.json();
  return productIds.productIds.map((product) => ({ productId: product }));
}

// Required function for `output: export` to statically generate the pages.
export async function generateStaticParams() {
  const productIds = await fetchAllProductIds();
  return productIds;
}

export default async function Page({ params }) {
  const { productId } = params;

  let productData = null;
  let error = null;

  try {
    const response = await fetch(
      "https://backend.yeesto.com/getProductById",
      {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching product data: ${response.statusText}`);
    }

    productData = await response.json();
  } catch (err) {
    error = err.message;
    console.error("Failed to fetch product data:", error);
  }

  if (!productData) {
    return (
      <div>
        <title>Product Not Found - E-commerce Site</title>
        <p>{error ? error : "Product not found."}</p>
      </div>
    );
  }

  const description = productData.productDescription
    .replace(/<\/p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();

  const keywords = productData.productTag.join(", ");

  //   i want to export meta tag
  //   export const metadata = {
  //   title: "Create Next App",
  //   description: "Generated by create next app",
  // };

  return (
    <div style={{ backgroundColor: whiteColor_v_2 }}>
      <title>{productData.productName} - Buy Now!!!</title>
      <meta property="og:title" content={productData.productName} />
      <meta name="keywords" content={keywords} />
      <meta property="og:image" content={productData.images[0]} />
      <meta property="og:description" content={description} />

      <SingleProductPageReduxWrapped productData={productData} />
    </div>
  );
}

// ? new

// import Head from "next/head";
// import { whiteColor_v_2 } from "../../../../color";
// import SingleProductPageReduxWrapped from "./SingleProductPageReduxWrapped";

// // Mock function to simulate fetching all product IDs.
// async function fetchAllProductIds() {
//   const response = await fetch("https://backend.yeesto.com/getAllProductId");
//   const productIds = await response.json();
//   return productIds.productIds.map((product) => ({ productId: product }));
// }

// export async function generateStaticParams() {
//   const productIds = await fetchAllProductIds();
//   return productIds;
// }

// export default async function Page({ params }) {
//   const { productId } = params;

//   let productData = null;
//   let error = null;

//   try {
//     const response = await fetch(
//       "https://backend.yeesto.com/getProductById",
//       {
//         method: "POST",
//         body: JSON.stringify({ productId }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching product data: ${response.statusText}`);
//     }

//     productData = await response.json();
//   } catch (err) {
//     error = err.message;
//     console.error("Failed to fetch product data:", error);
//   }

//   if (!productData) {
//     return (
//       <div>
//         <title>Product Not Found - E-commerce Site</title>
//         <p>{error ? error : "Product not found."}</p>
//       </div>
//     );
//   }

//   const description = productData.productDescription
//     .replace(/<\/p>/g, "\n")
//     .replace(/<[^>]+>/g, "")
//     .trim();

//   const keywords = productData.productTag.join(", ");

//   return (
//     <div style={{ backgroundColor: whiteColor_v_2 }}>
//       <Head>
//         <title>{productData.productName} - Buy Now!!!</title>
//         <meta property="og:title" content={productData.productName} />
//         <meta name="keywords" content={keywords} />
//         <meta property="og:image" content={productData.images[0]} />
//         <meta property="og:description" content={description} />
//       </Head>

//       <SingleProductPageReduxWrapped productData={productData} />
//     </div>
//   );
// }
