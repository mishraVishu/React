import ResturantCard ,{WithPromotedLabel} from "./RestaurantCard";
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
            const endPoint = window.innerWidth < 1024 ? "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.57590&lng=77.33450&carousel=true&third_party_vendor=1" : "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.57590&lng=77.33450&is-seo-homepage-enabled=true" ;

            const data = await fetch(endPoint);

            const json = await data.json();
            restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            console.log(restaurants);
            
            restaurants.map((res,i)=>i%2===0 ? res.info.promoted = true : res.info.promoted = false)
            setRes(restaurants);
            setTempList(restaurants);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
       
    }

    // this will print first then useEffect is called because component is rendered first .
    // Whenever state vaiable updates, React triggers reconcilliation cycle(re-renders the component)
    console.log('Body rendered',res);

    const RestaurantWithPromoted = WithPromotedLabel(ResturantCard);

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return <h1>OOPS no internet connection!!!. Looks like your internet connection is gone.</h1>

    return Array.isArray(res) && res.length === 0 ? <Shimmer /> : (
        <div className="w-full flex flex-col items-center">
            <div className="flex m-2 p-2">
                <div className="search">
                    <input className="border-green-600 border-solid border-2 rounded-md px-2 mr-4" type="text" onChange={(e) => {
                        const matchedList = Array.isArray(res) ? res.filter(res => res?.info?.name?.toLowerCase().includes(e.target.value.toLocaleLowerCase())) : [];
                        setTempList(matchedList);
                     }} placeholder="search..."></input>
                </div>
                <button className="rounded-lg bg-green-600  text-xs md:text-base lg:text-base px-2 w-auto" onClick={() => {
                    const filteredList = Array.isArray(res) ? res.filter(res => res.info?.avgRating > 4.3) : [];
                    setTempList(filteredList);
                }}>Top Rated Restaurants </button>
            </div>
            <div className="w-full flex flex-wrap justify-center items-center gap-4">
                {
                    Array.isArray(tempList) ? tempList.map(res => <Link className="link" key={res.info?.id} to={`/restaurants/${res?.info?.id}`}>{ res?.info?.promoted ? (<RestaurantWithPromoted data = {res}/>) : (<ResturantCard data={res} /> )} </Link>) : null
                }
            </div>
        </div>
    )
}

export default Body;