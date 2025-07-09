import React from "react";
import ReactDOM from "react-dom/client";
import restaurants from "./restaurants";

/**
 * header
 * - logo
 * - Navigation Items
 * Body
 * - Search Bar
 * - Resturant Container
 *      - Resturant Card
 *          - Image
 *          - Name of res, Star Rating, cuisines, delivery time
 * Footer
 * - copyright
 * - Links
 * - Address
 * - Contact
 */

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="https://as2.ftcdn.net/v2/jpg/15/58/18/19/1000_F_1558181960_y77QmPRQl40Mb5hIBM5IKgWrxThV1mnH.jpg"/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

const ResturantCard = ({data}) => {
    // console.log(data);
    const {name, locality, avgRating, cuisines, deliveryTime,cloudinaryImageId} = data.info;
    return(
        <div className="res-card">
            <div className="food-logo">
                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} alt="food image"></img>
            </div>
            <div className="description">
                <h3>{name}</h3>
                <div className="details">
                    <p>{avgRating}</p>
                    <p className="time">{deliveryTime}</p>
                </div>
                <p>{cuisines?.join(',')}</p>
                <p>{locality}</p>
            </div>
        </div>
    )
}

const Body = () => {
    return(
        <div className="body">
            <div className="search">Search</div>
            <div className="res-container">
                {
                    restaurants.map(res=> <ResturantCard data={res} key={res.info?.id}/>)
                }
            </div>
        </div>
    )
}

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);