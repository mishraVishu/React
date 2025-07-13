## Food delivery App

header
 - logo
 - Navigation Items
Body
 - Search Bar
 - Resturant Container
      - Resturant Card
          - Image
          - Name of res, Star Rating, cuisines, delivery time
Footer
 - copyright
 - Links
 - Address
 - Contact

## There are tywo types of Export/Import 

- Default export/import
    export default componentName;
    import component from "path"

- named export/import
    export const component;
    import {compinent} from "path";

## React Hooks
    (Normal JS utility Functions)   

    There are two very imp hooks
    - useState() - used for state variables
    - useEffetc() 

## useState Hook 

    - In useState() Hook first variable is for setting the default value or current State, and second argument which is a function is used so that when we use that arg then React triggers the reconcilliation process and updates the state of the component and re-render the UI .
    - UseState() Hook returns an array and this syntax below for useState is array destructuring. We can also use like -   arr = useState(0);
                        const [count,setCount] = arr;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1> {/* Virtual DOM element */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}  

When the button is clicked:
    - setCount(count + 1) is called.
    - React schedules re-render.
    - JSX is re-evaluated → new virtual DOM is created.
    - Diffing finds that <h1>{count}</h1> changed.
    - Only the text content of <h1> is updated in the real DOM.


 