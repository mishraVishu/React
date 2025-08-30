import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const RestaurantMenuItems = ({ data }) => {
    // Open all main sections and all subcategories by default
    const [openIndex, setOpenIndex] = useState(() => {
        return Array.isArray(data) ? data.map((_, idx) => idx) : [];
    });
    const [openCategory, setOpenCategory] = useState(() => {
        const categoriesState = {};
        if (Array.isArray(data)) {
            data.forEach((section, idx) => {
                const cats = section?.card?.card?.categories;
                if (Array.isArray(cats) && cats.length > 0) {
                    categoriesState[idx] = cats.map((_, catIdx) => catIdx);
                }
            });
        }
        return categoriesState;
    });

    const [descState, setDescState] = useState(null);

    // Toggle logic for multi-open
    const handleClick = (idx) => {
        setOpenIndex(prev => {
            console.log(prev);
            return prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx];
        });
        setOpenCategory(prev => {
            console.log(prev);
            const newState = { ...prev };
            if (prev[idx]) delete newState[idx];
            console.log(newState);
            return newState;
        });
    };

    const handleCategoryClick = (mainIdx, catIdx) => {
        setOpenCategory(prev => {
            console.log(prev);
            const current = prev[mainIdx] || [];
            return {
                ...prev,
                [mainIdx]: current.includes(catIdx)
                    ? current.filter(i => i !== catIdx)
                    : [...current, catIdx]
            };
        });
    };

    const descpHandler = (id, displayDesc, desc) => {
        displayDesc = desc;
        setDescState(prev => prev === id ? null : id);
    }

    const handleDescClick = (id, displayDesc, desc) => {
        displayDesc = desc;
        setDescState(prev => prev === id ? null : id);
    }

    return (
        <div className="bg-pink-50">
            {data.map((card, idx) => (
                <div className="p-4 mx-auto my-4 bg-white" key={card?.card?.card?.categoryId || idx}>
                    <div className="flex justify-between w-full cursor-pointer" onClick={() => handleClick(idx)}>
                        <h2 className="font-bold text-xl">{card?.card?.card?.title}</h2>
                        <IoIosArrowUp />
                    </div>
                    {/* If main section is open and has itemCards, show them */}
                    {(openIndex.includes(idx) && card?.card?.card?.itemCards) ? card?.card?.card?.itemCards.map((card, i) => {
                        let desc = card?.card?.info?.description;
                        let displayDesc = desc;
                        if (desc && desc.length > 100) {
                            displayDesc = [desc.slice(0, 50), <strong key="more">...more</strong>];
                        }
                        return (
                            <div className="flex w-full border-b-2 border-gray-200 my-2 p-6" key={card?.card?.info?.id || i}>
                                <div className="w-10/12">
                                    <h2 className="font-bold text-lg my-2">{card?.card?.info?.name}</h2>
                                    <h3 className="font-bold text-sm">{card?.card?.info?.defaultPrice ? '₹'+(card?.card?.info?.defaultPrice /100) : '₹'+(card?.card?.info?.price /100)}</h3>
                                    <h5 className="font-bold my-4 text-green-600 text-sm">{`⭐️ ${card?.card?.info?.ratings?.aggregatedRating?.rating || 4.2 } (${card?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 || 239})`}</h5>
                                    {descState === card?.card?.info?.id ? (
                                        <p className="text-sm text-gray-500 mb-4 cursor-pointer" onClick={() =>{descpHandler(card?.card?.info?.id,displayDesc,desc)}}>{desc}</p>
                                    ) : <p className="text-sm text-gray-500 mb-4 cursor-pointer" onClick={() =>{descpHandler(card?.card?.info?.id,displayDesc,desc)}}>{displayDesc}</p>}
                                </div>
                                <div className="relative">
                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${card?.card?.info?.imageId}`} alt="image" className="size-44 rounded-lg mt-2" />
                                    <button className="absolute left-7 -bottom-1.5 rounded-lg border border-gray-400 px-8 py-2 text-green-600 font-semibold bg-white bg-opacity-80 shadow-md">Add</button>
                                </div>
                            </div>
                        );
                    }) :
                    // If main section is open and has categories, show subcategories
                    (openIndex.includes(idx) && Array.isArray(card?.card?.card?.categories)) && card?.card?.card?.categories.map((category, catIdx) => (
                        <div key={category.id || catIdx}>
                            <div className="flex justify-between w-full cursor-pointer" onClick={() => handleCategoryClick(idx, catIdx)}>
                                <h2 className="font-bold text-lg">{category.title}</h2>
                                <IoIosArrowUp />
                            </div>
                            {/* Only show items if this subcategory is open */}
                            {openCategory[idx]?.includes(catIdx) && Array.isArray(category.itemCards) && category.itemCards.map((card, i) => {
                                let desc = card?.card?.info?.description;
                                let displayDesc = desc;
                                if (desc && desc.length > 100) {
                                    displayDesc = [desc.slice(0, 50), <strong key="more">...more</strong>];
                                }
                                return (
                                    <div key={card?.card?.info?.id || i} className="flex justify-between w-full border-b-2 border-gray-200 p-6">
                                        <div className="w-10/12">
                                            <h2 className="font-bold text-md my-2">{card?.card?.info?.name}</h2>
                                            <h3 className="font-bold text-sm">{card?.card?.info?.defaultPrice ? '₹'+(card?.card?.info?.defaultPrice /100) : '₹'+(card?.card?.info?.price /100)}</h3>
                                            <h5 className="font-bold my-4 text-green-600 text-sm">{`⭐️ ${card?.card?.info?.ratings?.aggregatedRating?.rating || 4.2} (${card?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 || 239})`}</h5>
                                            {descState ===card?.card?.info?.id ? <p className="text-sm text-gray-500 w-9/12 mb-4 cursor-pointer" onClick={() => handleDescClick(card?.card?.info?.id,displayDesc,desc)}>{desc}</p> : <p className="text-sm text-gray-500 w-9/12 mb-4 cursor-pointer" onClick={() => handleDescClick(card?.card?.info?.id,displayDesc,desc)}>{displayDesc}</p>}
                                        </div>
                                        <div className="relative">
                                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${card?.card?.info?.imageId}`} alt="image" className="size-44 rounded-lg my-2" />
                                            <button className="absolute -bottom-1.5 left-7 rounded-lg border border-gray-400 px-8 py-2 text-green-600 font-semibold bg-white bg-opacity-80 shadow-md">Add</button>
                                        </div>
                                        <div className="border-b-2 border-gray-200"></div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RestaurantMenuItems;