import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestauratMenu";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Shimmer from "./shimmer";
import RestaurantMenuItems from "./RestaurantMenuItems";
import { useDispatch } from "react-redux";
import { getImage } from "../utils/CartSlice";

const RestaurantMenu = () => {
    const scrollRef = useRef(null);
    // useRef is used to directly access the DOM element, here scrollRef is used to access the scrollable div for the offers section.

    const [scrollLeft, setCanScrollLeft] = useState(scrollRef.current?.scrollLeft || 0);
    const [scrollRight, setScrollRight] = useState(true);

    const dispatch = useDispatch();
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    // Defensive check for REGULAR card group
    const regularCardGroup = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
    const cards = regularCardGroup?.cards || [];
    let itemCards = cards.filter(card => {
        if (card?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
            return card;
        }
        else if (card?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
            return card;
        }
    });

    // Defensive info extraction
    const info = resInfo?.data?.cards[2]?.card?.card?.info || {};
    const { name, avgRating, costForTwoMessage, cuisines, areaName, cloudinaryImageId, sla } = info;
    const minDeliveryTime = sla?.minDeliveryTime;
    const maxDeliveryTime = sla?.maxDeliveryTime;

    useEffect(() => {
        if (cloudinaryImageId && name && areaName) {
            dispatch(getImage({cloudinaryImageId,name,areaName}));
        }
    }, [cloudinaryImageId, dispatch]);

    const scroll = (scrollOffset) => {
        console.log(scrollRef.current.scrollLeft);
        scrollRef.current.scrollBy({
            left: scrollOffset,
            behavior: "smooth"
        });
        setCanScrollLeft(scrollRef.current.scrollLeft);
        setScrollRight(scrollRef.current.scrollLeft + scrollRef.current.clientWidth);
    };

    if (resInfo === null) {
        return <Shimmer />
    }

    console.log(resInfo);
    const { offers } = resInfo?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle || {};

    return (
        <div className="flex justify-center items-center gap-4 flex-col">
            <h1 className="text-left text-4xl font-bold mt-8">{name}</h1>
            <div className="flex justify-center flex-col h-48 w-1/2 md:w-1/2 lg:w-1/2 2xl:w-1/3 xl:w-1/2  border-2 shadow-xl shadow-gray-500 border-solid border-gray rounded-xl p-4" >
                <div className="flex gap-4">
                    <h4>⭐️ {avgRating}</h4>
                    <h4>{costForTwoMessage}</h4>
                </div>
                <p className="text-orange-600 font-bold underline decoration-orange-600">{Array.isArray(cuisines) ? cuisines.join(",") : ''}</p>
                <div className="place-date">
                    <p className="font-bold">outlet: {areaName}</p>
                    <p className="font-bold">{minDeliveryTime} - {maxDeliveryTime} mins</p>
                </div>
            </div>
            <div className="w-1/2 md:w-1/2 lg:w-1/2 2xl:w-1/3 xl:w-1/2">
                <div className="flex justify-between">
                    <h2 className="font-bold text-xl">Deals for you</h2>
                    <div className="flex gap-2">
                        <button className="rounded-full bg-green-600 p-2" disabled={scrollLeft === 0} onClick={() => scroll(-200)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <button className="rounded-full bg-green-600 p-2" disabled={scrollRight === scrollRef?.current?.scrollWidth - 100} onClick={() => scroll(200)}><FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
                <div className="flex overflow-hidden" ref={scrollRef}>
                    {offers.map(offer => {
                        return (
                            <React.Fragment key={offer?.info?.offerIds[0]}>
                                <div className="flex justify-between border border-gray-300 rounded-2xl gap-4 m-4 p-4 min-w-80 h-20">
                                    <div className="font-bold text-orange-600">{offer?.info?.offerTag}</div>
                                    <div className="flex flex-col">
                                        <h4 className="font-bold">{offer?.info?.header}</h4>
                                        <h5 className="text-gray-400">{offer?.info?.description.toUpperCase()}</h5>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className="w-1/2 md:w-1/2 lg:w-1/2 2xl:w-1/3 xl:w-1/2">
                <h1 className="font-bold text-md">Menu</h1>
                <RestaurantMenuItems data={itemCards} />
            </div>
        </div>
    )
}

export default RestaurantMenu;