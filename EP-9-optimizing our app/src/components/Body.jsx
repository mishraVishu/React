import ResturantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { useEffect, useState } from "react";
import {Link} from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [res, setRes] = useState([]);
    const [tempList, setTempList] = useState([]);

    // useEffect hook is called just after components finishes rendering
    useEffect(() => {
        console.log('useEffect called');
        fetchData();
    }, []);

    let restaurants = [];
    const fetchData = async () => {
        try{
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.57590&lng=77.33450&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

            const json = await data.json();
            restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            setRes(restaurants);
            setTempList(restaurants);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
       
    }

    // this will print first then useEffect is called because component is rendered first .
    // Whenever state vaiable updates, React triggers reconcilliation cycle(re-renders the component)
    console.log('Body rendered');

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return <h1>OOPS no internet connection!!!. Looks like your internet connection is gone.</h1>

    return res.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" onChange={(e) => {
                        const matchedList = res.filter(res => res?.info?.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()));
                        setTempList(matchedList);
                     }} placeholder="search..."></input>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filteredList = res.filter(res => res.info.avgRating > 4.3)
                    setTempList(filteredList);
                }}>Top Rated Restaurants </button>
            </div>
            <div className="res-container">
                {
                    tempList.map(res => <Link className="link" key={res.info?.id} to={`/restaurants/${res?.info?.id}`}><ResturantCard data={res} /></Link>)
                }
            </div>
        </div>
    )
}

export default Body;