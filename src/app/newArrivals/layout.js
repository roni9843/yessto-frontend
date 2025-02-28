"use client";

import Footer from "@/app/components/Footer/Footer";
import HomePageHeaderReduxWrapped from "@/app/product/[productId]/HomePageHeaderReduxWrapped";
import { store } from "@/app/redux/store";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../../color";

export default function newArrivalsLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: whiteColor_v_2 }}>
        <Provider store={store}>
          <HomePageHeaderReduxWrapped></HomePageHeaderReduxWrapped>
          <div className=""></div>
          {children}

          <div className="mt-3">
            <Footer></Footer>
          </div>
        </Provider>
      </body>
    </html>
  );
}
