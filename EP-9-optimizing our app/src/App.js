import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/shimmer";
// import Grocery from "./components/Grocery";

// chunking
// code splitting
// dynamic bundling
// lazy loading
// on demand loading

const Grocery = lazy(()=> import("./components/Grocery"));

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    )
}
    
const routes = createBrowserRouter([
    {
        path: '/', element: <AppLayout />, errorElement: <Error />,
         children: [
            { path: '/about', element: <About /> },
            { path: '/contactus', element: <ContactUs /> },
            { path: '/grocery', element: <Suspense fallback={<Shimmer/>}><Grocery /></Suspense> },
            { path: '/', element: <Body /> },
            { path: '/restaurants/:resId', element: <RestaurantMenu /> }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<AppLayout />);
root.render(<RouterProvider router={routes} />)