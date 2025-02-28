"use client";

import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import Products from "./Products";

export default function ProductsPageReduxWrapped() {
  return (
    <Provider store={store}>
      <Products></Products>
    </Provider>
  );
}
//   <HomePageHeader></HomePageHeader>
