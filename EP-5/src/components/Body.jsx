import ResturantCard from "./RestaurantCard";
import restaurants from "../utils/restaurants";
import { useEffect, useState } from "react";

const Body = () => {

    const [res,setRes] = useState(restaurants);
    
    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn" onClick={() => {
                    const filteredList = restaurants.filter(res=>res.info.avgRating > 4.3)
                    setRes(filteredList);
                    console.log(filteredList);
                }}>Top Rated Restaurants </button>
            </div>
            <div className="res-container">
                {
                    res.map(res => <ResturantCard data={res} key={res.info?.id} />)
                }
            </div>
        </div>
    )
}

export default Body;