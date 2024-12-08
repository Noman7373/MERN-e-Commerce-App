import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../src/AppLayout/AppLayout.jsx";
import Home from "./components/Home.jsx";
import Searchpage from "./components/pages/Searchpage.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import ForgotPassword from "./components/pages/ForgotPassword.jsx";
import VerifyOtp from "./components/pages/VerifyOtp.jsx";
import Resetpassword from "./components/pages/Resetpassword.jsx";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { getUserLoginDetails } from "./Api/Query/userQuery.js";
import { setUserDetials } from "./store/userSlice.js";
import { useEffect } from "react";
import MobileMenu from "./components/MobileMenu.jsx";
import Dashboard from "./DashboardLayout/Dashboard.jsx";
import Profile from "./DashboardLayout/Profile.jsx";
import MyOrder from "./components/pages/MyOrder.jsx";
import SaveOrder from "./components/pages/SaveOrder.jsx";
import Category from "./components/pages/Category.jsx";
import SubCategory from "./components/pages/SubCategory.jsx.jsx";
import Adminproduct from "./components/pages/Adminproduct.jsx";
import UploadProduct from "./components/pages/UploadProduct.jsx";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Home />
            </>
          ),
        },
        {
          path: "/search",
          element: <Searchpage />,
        },
        {
          path: "/register-user",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/verify-opt",
          element: <VerifyOtp />,
        },
        {
          path: "/reset-password/:id",
          element: <Resetpassword />,
        },
        {
          path: "/menubar",
          element: <MobileMenu />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "profile/:id",
              element: <Profile />,
            },
            {
              path: "your-order",
              element: <MyOrder />,
            },
            {
              path: "save-order",
              element: <SaveOrder />,
            },
            {
              path: "admin-product",
              element: <Adminproduct />,
            },
            {
              path: "upload-product",
              element: <UploadProduct />,
            },
            {
              path: "product-category",
              element: <Category />,
            },
            {
              path: "product-Subcategory",
              element: <SubCategory />,
            },
          ],
        },
      ],
    },
  ]);

  const fetchUserData = async () => {
    try {
      const user = await getUserLoginDetails();
      dispatch(setUserDetials(user?.data?.userData));
      // console.log("user data", user?.data?.userData);
    } catch (error) {
      console.log("Data fetching error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
