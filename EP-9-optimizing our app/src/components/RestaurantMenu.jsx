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

    const { name, avgRating, costForTwoMessage, cuisines, areaName, sla: { minDeliveryTime, maxDeliveryTime } } = resInfo?.data?.cards[2]?.card?.card?.info;

    const { offers } = resInfo?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle;

    const { cards } = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

    let itemCards = {}
    cards.filter(card => {
        if (card?.card?.card?.itemCards) {
            return itemCards = card?.card?.card?.itemCards;
        }
    });

    return (
        <div className='restaurant-menu'>
            <h1 className="itemName">{name}</h1>
            <div className="info-div">
                <div className="rating">
                    <h4>⭐️ {avgRating}</h4>
                    <h4>{costForTwoMessage}</h4>
                </div>
                <p className="cuisines">{cuisines.join(",")}</p>
                <div className="place-date">
                    <p>outlet: {areaName}</p>
                    <p>{minDeliveryTime} - {maxDeliveryTime} mins</p>
                </div>
            </div>
            <div className="deals">
                <div className="deals-header">
                    <h2>Deals for you</h2>
                    <div className="navigation-buttons">
                        <button disabled={scrollLeft === 0} onClick={() => scroll(-200)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <button disabled={scrollRight === scrollRef?.current?.scrollWidth-100} onClick={() => scroll(200)}><FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
                <div className="offers" ref={scrollRef}>
                    {offers.map(offer => {
                        return (
                            <React.Fragment key={offer?.info?.offerIds[0]}>
                                <div className="offer">
                                    <div className="offer-tag">{offer?.info?.offerTag}</div>
                                    <div className="deal-info">
                                        <h4>{offer?.info?.header}</h4>
                                        <h5 className="des">{offer?.info?.description}</h5>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className="menus">
                <h1>Menu</h1>
                <div className="menu">
                    {itemCards ? itemCards.map(menu => {
                        const desc = menu.card.info.description;
                        const isLong = desc && desc.length > 50;
                        // Simple truncation logic, no expand/collapse
                        return (
                            <React.Fragment key={menu.card.info.id}>
                                <div className="menu-details">
                                    <div className="menu-des">
                                        <h3>{menu.card.info.name}</h3>
                                        <h5>{'₹' + (menu.card.info.price / 100)}</h5>
                                        <h3 className="desp">
                                                {isLong && expandedId !== menu.card.info.id ? (
                                                    <span onClick={() => setExpandedId(menu.card.info.id)}>{desc.slice(0, 50)}...more</span>
                                                ) : (
                                                    <span onClick={() => setExpandedId(null)}>{desc}</span>
                                                )}
                                        </h3>
                                    </div>
                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${menu.card.info.imageId}`} alt="image"></img>
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