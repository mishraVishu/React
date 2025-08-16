import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestauratMenu";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Shimmer from "./shimmer";

const RestaurantMenu = () => {
    const scrollRef = useRef(null);
    // useRef is used to directly access the DOM element, here scrollRef is used to access the scrollable div for the offers section.

    
    const [expandedId, setExpandedId] = useState(null);
    const [scrollLeft, setCanScrollLeft] = useState(scrollRef.current?.scrollLeft || 0);
    const [scrollRight, setScrollRight] = useState(true);

    const { resId } = useParams();
    
    const resInfo = useRestaurantMenu(resId);

    const scroll = (scrollOffset) => {
        console.log(scrollRef.current.scrollLeft);
        scrollRef.current.scrollBy({
            left:scrollOffset,
            behavior:"smooth"
        });
        setCanScrollLeft(scrollRef.current.scrollLeft);
        setScrollRight(scrollRef.current.scrollLeft + scrollRef.current.clientWidth) ;
    };

    if (resInfo === null) {
        return <Shimmer />
    }

    const { name, avgRating, costForTwoMessage, cuisines, areaName, sla: { minDeliveryTime, maxDeliveryTime } } = resInfo?.data?.cards[2]?.card?.card?.info || {};

    const { offers } = resInfo?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle;

    // Defensive check for REGULAR card group
    const regularCardGroup = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
    const cards = regularCardGroup?.cards || [];

    let itemCards = [];
    cards.forEach(card => {
        if (Array.isArray(card?.card?.card?.itemCards)) {
            itemCards = card.card.card.itemCards;
        }
    });

    return (
        <div className="flex justify-center items-center gap-4 flex-col">
            <h1 className="text-left text-4xl font-bold">{name}</h1>
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
                        <button className="rounded-full bg-green-600 p-2" disabled={scrollRight === scrollRef?.current?.scrollWidth-100} onClick={() => scroll(200)}><FontAwesomeIcon icon={faArrowRight} /></button>
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
                <div className="flex flex-col m-4 ">
                    {Array.isArray(itemCards) && itemCards.length > 0 ? itemCards.map(menu => {
                        const desc = menu.card.info.description;
                        const isLong = desc && desc.length > 50;
                        // Simple truncation logic, no expand/collapse
                        return (
                            <React.Fragment key={menu.card.info.id}>
                                <div className="flex justify-between 2xl:m-2 2xl:p-2 md:m-4 md:p-4 border-b-2 border-gray-200">
                                    <div className="flex flex-col max-w-80">
                                        <h3 className="text-lg text-gray-600 font-bold">{menu.card.info.name}</h3>
                                        <h5 className="m-2">{'₹' + (menu.card.info.price/100)}</h5>
                                        <h3 className="text-md text-gray-500">
                                                {isLong && expandedId !== menu.card.info.id ? (
                                                    <span onClick={() => setExpandedId(menu.card.info.id)}>{desc.slice(0, 50)}...more</span>
                                                ) : (
                                                    <span onClick={() => setExpandedId(null)}>{desc}</span>
                                                )}
                                        </h3>
                                    </div>
                                    <img className="rounded-xl size-32" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${menu.card.info.imageId}`} alt="image"></img>
                                </div>
                            </React.Fragment>
                        )
                    }) : <h2>No data Found</h2>}
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu;