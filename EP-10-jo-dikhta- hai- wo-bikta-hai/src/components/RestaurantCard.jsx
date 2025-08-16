import { CDN_URL, star } from "../utils/constants";

const ResturantCard = ({data}) => {
    // console.log(data);
    // console.log(React,ReactDOM)
    const {name, locality, avgRating, cuisines, deliveryTime,cloudinaryImageId} = data.info;

    return(
        <div>
            <div className="m-2 sm:m-4 p-2 sm:p-4">
                <img className="h-40 sm:h-56 w-full sm:w-72 md:w-96 rounded-xl hover:scale-110 transition-transform duration-200" src={`${CDN_URL}${cloudinaryImageId}`} alt="food image"></img>
            </div>
            <div className="flex m-2 sm:m-4 p-2 sm:p-4 flex-col">
                <h3 className="w-full sm:w-56 text-base sm:text-lg font-semibold">{name}</h3>
                <div className="details flex flex-wrap gap-2">
                    <p> {avgRating}</p>
                    <p className="time">{deliveryTime}</p>
                </div>
                <p className="text-sm sm:text-base">{cuisines.join(",").length>30 ? cuisines.join(",").substr(0,30)+'...' : cuisines.join(",") }</p>
                <p className="text-xs sm:text-sm">{locality}</p>
            </div>
        </div>
    )
}

export default ResturantCard;