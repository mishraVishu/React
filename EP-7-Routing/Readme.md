## React Router DOM 

- it is a library which we used for routing in React application. 
- for this we need to export (named export) {createBrowserRouter, RouterProvider} from 'react-dom';
- then we need to configure createBrowserRouter which takes an array of object which is basically path configuration.

const routes = createBrowserRouter([
    { path: '/', element: <AppLayout />, errorElement: <Error /> },
    { path: '/about', element: <About /> },
    { path: '/contactus', element: <ContactUs /> }
])

- then we need to render <RouterProvider router={routes} />

- root.render(<RouterProvider router={routes} />)

## useRouteError Hook

- use useRouteError hook to show error in a more defined way.

const Error = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div>
            <h1>Oops!!!</h1>
            <h2>Something went wrong!!</h2>
            <h3>{err.status} : {err.statusText}</h3>
        </div>
    )
}
 
## children Routes

const routes = createBrowserRouter([
    {
        path: '/', element: <AppLayout />, errorElement: <Error />, children: [
            { path: '/about', element: <About /> },
            { path: '/contactus', element: <ContactUs /> },
            { path: '/', element: <Body /> }
        ]
    }
]);

## <Outlet>
 - use <Outlet> to render the Children inside parent component. import it from react-router

 import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    )
}

## Types of Routing 

1.Client side Routing - Client-Side Rendering (CSR) is a technique where the content of a web page is rendered directly in the browser using JavaScript,

#Initial Request:
  - The browser requests the HTML page.
  - The server sends a bare-bones HTML file with a <script> tag pointing to the JavaScript bundle (usually built by frameworks like React, Angular, Vue).

#JavaScript Loads:
  - Once the browser loads the JS bundle, the framework (e.g., React) takes over.
  - It dynamically generates the full UI in the browser using JavaScript + DOM manipulation.

#Routing and Updates:
  - Routing is handled on the client using tools like React Router, Vue Router, etc.
  - Interactions and updates do not reload the page – they change the DOM dynamically using JavaScript.

2. Server Side Routing - Here we need to make network call every time we change the route.  