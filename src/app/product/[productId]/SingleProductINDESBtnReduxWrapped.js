"use client";

import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import SingleProductINDESBtn from "./SingleProductINDESBtn";

export default function SingleProductINDESBtnReduxWrapped({ productData }) {
  return (
    <Provider store={store}>
      <SingleProductINDESBtn productData={productData}></SingleProductINDESBtn>
    </Provider>
  );
}

// <SingleProductINDESBtn productData={productData}></SingleProductINDESBtn>
