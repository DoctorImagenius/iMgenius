import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Graphy from "./pages/Graphy";
import Contact from "./pages/Contact";
import Beauty from "./pages/Beauty";
import Settings from "./pages/Settings";
import Error from "./pages/Error";
import { AppProvider } from "./ApplicationData";
import { ToastContainer } from "react-toastify";
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
const route = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/iGraphy",
        element: <Graphy></Graphy>,
    },
    {
        path: "/iBeauty",
        element: <Beauty></Beauty>,
    },
    {
        path: "/iContact",
        element: <Contact></Contact>,
    },
    {
        path: "/iSettings",
        element: <Settings></Settings>,
    },
    {
        path: "/*",
        element: <Error></Error>,
    },
]);

root.render(
    <React.StrictMode>
        <ToastContainer />
        <AppProvider>
            <RouterProvider router={route}>
                <Home></Home>
            </RouterProvider>
        </AppProvider>
    </React.StrictMode>
);


