import { configureStore } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import usersReducer, {
  AllProduct,
  addCategoryWithProductRedux,
  addOrderHistory,
  addToCartFromStorage,
  filterCategory,
  filterOfferProduct,
  setUserInfo,
  setUserPhone,
} from "./userSlice";

// Configure store
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const autoCall = async () => {
  // Dispatch action to set user info after store is configured
  // const token = localStorage.getItem("token");

  // autoCallGlobal()

  console.log("this is auto call");
  

  // // ? get all product
  // await getAllCategoryWithProductFunc();

  //fetch("https://backend.yeesto.com/getAllCategoryWithProducts")
  fetch("https://backend.yeesto.com/getAllCategoryWithProducts")
    .then((response) => response.json())
    .then((data) => {

      console.log("this is auto call ",data);

      store.dispatch(addCategoryWithProductRedux(data.data));
      store.dispatch(filterCategory(data.data));
      store.dispatch(AllProduct(data.data));
      store.dispatch(filterOfferProduct(data.data));
    })

    .catch((error) => console.error("Error fetching categories:", error));

    console.log("this is auto call 2");
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    // Retrieve cart items from localStorage and dispatch to Redux store
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      store.dispatch(addToCartFromStorage(parsedCartItems)); // Dispatch to set cart items in Redux store
    }

    if (token) {
      document.cookie = `token=${token}`;

      try {
        const userInfo = jwtDecode(token);

        const fetchUserInfo = async (userId) => {
          const response = await fetch(
            "https://backend.yeesto.com/getTheUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: userId }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }

          return response.json();
        };

        const fetchUser = await fetchUserInfo(userInfo.id);

        if (fetchUser) {
          store.dispatch(setUserInfo(fetchUser.user));
          store.dispatch(setUserPhone(fetchUser.user.phone));
          store.dispatch(addOrderHistory(fetchUser.orderHistory));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }
};

autoCall();
