"use client";

import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import SingleProductPage from "./SingleProductPage";

export default function SingleProductPageReduxWrapped({ productData }) {
  return (
    <Provider store={store}>
      <SingleProductPage productData={productData} />
    </Provider>
  );
}
