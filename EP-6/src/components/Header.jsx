import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
    // using useState varibles in React because normal Js variables can't trigger re-render here, setBtnName which is a function trigger re-render, tells react that i have some value to be updated so need to re-render

    // how we rae able to assign updated value to a const btnName variable because when re-render trigger React re-renders the whole component and now btnName is a new variable biut with updated value which is generated through virtual DOm using diffing algorithm , using the process of reconcilliation.
    const [btnName, setBtnName] = useState("Login")

    return (
        <div className="header">
            <div className="logo">
                <img src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Cart</li>
                    <button className="login-btn" onClick={() => { btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");}}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;