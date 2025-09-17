import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
    // using useState varibles in React because normal Js variables can't trigger re-render here, setBtnName which is a function trigger re-render, tells react that i have some value to be updated so need to re-render

    // how we are able to assign updated value to a const btnName variable because when re-render trigger React re-renders the whole component and now btnName is a new variable biut with updated value which is generated through virtual DOm using diffing algorithm , using the process of reconcilliation.
    const [btnName, setBtnName] = useState("Login");
    const [menuOpen, setMenuOpen] = useState(false);

    const onlineStatus = useOnlineStatus();

    const cartItems = useSelector((store)=> store.cart.items );
    
    return (
        <header className="w-full shadow-md bg-white font-[Gilory]">
            <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 w-full max-w-6xl mx-auto">
                <div className="flex justify-between items-center w-full sm:w-auto mb-2 sm:mb-0">
                    <img src={LOGO_URL} className="w-20 sm:w-36 mx-auto"/>
                    <button className="sm:hidden text-2xl p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars />
                    </button>
                </div>
                <nav className={`w-full sm:w-auto ${menuOpen ? '' : 'hidden'} sm:block`}>
                    <ul className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-white sm:bg-transparent p-4 sm:p-0 rounded-lg shadow sm:shadow-none">
                        {/* <li className="font-bold text-base sm:text-sm font-serif">Online Status: {onlineStatus ? "🟢" :"🔴"}</li> */}
                        <li className="font-bold text-base sm:text-sm font-serif"> <Link className="link" to='/'>Home</Link></li>
                        <li className="font-bold text-base sm:text-sm font-serif"> <Link className="link" to='/about'>About Us</Link></li>
                        <li className="font-bold text-base sm:text-sm font-serif"> <Link className="link" to='/contactus'>Contact</Link></li>
                        <li className="font-bold text-base sm:text-sm font-serif"> <Link className="link" to='/grocery'>Grocery</Link></li>
                        <li className="relative"> <Link to='/cart'><FaShoppingCart className="size-7"/></Link><div className="rounded-full bg-green-600 absolute p-2 bottom-6 left-3" data-testid="cart">{cartItems.length}</div></li>
                        <li>
                            <button className="rounded-lg bg-green-600 px-6 py-2 w-full sm:w-auto" onClick={() => { btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");}}>{btnName}</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;