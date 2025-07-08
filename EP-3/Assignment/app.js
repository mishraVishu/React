import React from "react";
import ReactDOM from "react-dom/client";

// Create heading elements
const h1 = React.createElement("h1", { key: "h1" }, "Heading 1");
const h2 = React.createElement("h2", { key: "h2" }, "Heading 2");
const h3 = React.createElement("h3", { key: "h3" }, "Heading 3");

// Create a div with class "title" containing the headings
const div = React.createElement("div", { className: "title" }, [h1, h2, h3]);

// Using JSX Now 
const divJSX = (
    <div className="title">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
    </div>
)

const AnotherComponent = () => {
    return (
        <p>
            Another Component
        </p>
    )
}

const JSXFunctionalComp = () => {
    return (
        <div className="title">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <AnotherComponent />
        </div>

    )
}

const HeaderComponent = () => { 
    return(
        <div>
            <div>
                <img scr="https://in.pinterest.com/pin/487444359669938558/" alt="logo"></img>
            </div>
            <div>
                <input type="text" placeholder="searchBar..."></input>
                <span className="material-symbols-outlined">person</span>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(div)
//root.render(divJSX);
//root.render(<JSXFunctionalComp/>)
root.render(<HeaderComponent/>);