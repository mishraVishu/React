import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
    // using useState varibles in React because normal Js variables can't trigger re-render here, setBtnName which is a function trigger re-render, tells react that i have some value to be updated so need to re-render

    // how we are able to assign updated value to a const btnName variable because when re-render trigger React re-renders the whole component and now btnName is a new variable biut with updated value which is generated through virtual DOm using diffing algorithm , using the process of reconcilliation.
    const [btnName, setBtnName] = useState("Login")

    return (
        <div className="header">
            <div className="logo">
                <img src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li> <Link className="link" to='/'>Home</Link></li>
                    <li> <Link className="link" to='/about'>About Us</Link></li>
                    <li> <Link className="link" to='/contactus'>Contact</Link></li>
                    <li> <Link className="link" to='/cart'>Cart</Link></li>
                    <button className="login-btn" onClick={() => { btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");}}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;