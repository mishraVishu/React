import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => ReactElement(Object) => HTMLElement(render);

const heading = React.createElement("h1", { id: "heading" }, "Hi Vaishali");
console.log(heading); //JS Object

// JSX (transpiles before it reaches to JS Engine) => parcel => Babel

// JSX => React.createElement() => ReactElement(JS Object) => HTMLElement(render)

// for writing JSX in multiple Lines its mendetory to use ();

const jsxHeading = (
  <h1 id="heading" className="head" tabIndex="1">
    Hi Vaishali from JSX
  </h1>
); //jsx is not HTML in React ,its HTML like or XML like syntax.
console.log(jsxHeading);

// React Components
// Class Based Component - old
// Functional Compoment - New

// Functional Component

const Title = () => {
    return (
        <div>
            <h2>This is title </h2>
        </div>
    )
};

const number = 10000;
const paragraph = <p>This is paragraph.</p>

// Component inside another component is Component Composition
// we can execute any javascript code inside JSX using curly braces {}
const HeadingComponent = () => {
  return (
    <div>
      <h1 className="heading">Hello Vaishali from Functional Component</h1>
      <Title/>
      <Title></Title>
      {Title()}
      {paragraph}
      {number} 
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")); // takes object and convert it into DOM Element , put it into DOM

// root.render(jsxHeading);

root.render(<HeadingComponent />);
