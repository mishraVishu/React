import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

// const About = () => {
//     return(
//         <div>
//             <h1>About Page</h1>
//             <UserClass name = {"Vaishali Mishra"} />
//         </div>
//     )
// }

class About extends Component{
    constructor(){
        super();

        // console.log("Parent Constructor Called");
    }

    componentDidMount(){
        // console.log("Parent Component Did Mount Called");
    }

    render(){
        // console.log("Parent Render Called");

        return(
            <div className="w-full max-w-2xl mx-auto p-2 sm:p-4">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">About Page</h1>
                <UserClass name={"first Child"} />
                {/* <UserClass name={"second Child"} /> */}
                <UserContext.Consumer>
                    {({loggedInUser}) => (<h2 className="font-bold">{loggedInUser}</h2>)}
                </UserContext.Consumer>
            </div>
        )
    }
}

export default About;

/**
 * Parent Constructor Called
 * Parent Render Called
 * 
 * - first Child Child Constructor Called
 * - first Child Child Render Called
 * - second Child Child Constructor Called
 * - second Child Child Render Called
 * 
 *  Batches the updates
 * - first Child Child Component Did Mount Called
 * - second Child Child Component Did Mount Called
 * 
 * Parent Component Did Mount Called
 * 
 * 
 * Parents know what children they have before children are created.
 * All children are fully mounted before the parent’s componentDidMount runs, so the parent can safely interact with its children if needed.
 */