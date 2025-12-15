import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/shimmer";
import Cart from "./components/Cart";

import UserContext from "./utils/UserContext";

import { Provider } from "react-redux"; 
import AppStore from "./utils/AppStore";
// import Grocery from "./components/Grocery";

// chunking
// code splitting
// dynamic bundling
// lazy loading
// on demand loading

const Grocery = lazy(()=> import("./components/Grocery"));




// we can have nested providers also . We can pass differt values to different Components using context.provider
const AppLayout = () => {
    const [userName, setUserName] = useState('Vaishali');
    return (
        <Provider store = { AppStore }>
            <UserContext.Provider value = {{loggedInUser:userName, setUserName}}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
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
            { path: '/restaurants/:resId', element: <RestaurantMenu /> },
            { path: '/cart', element: <Cart /> }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<AppLayout />);
root.render(<RouterProvider router={routes} />)