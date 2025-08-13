import { CDN_URL } from "../utils/constants";

const ResturantCard = ({data}) => {
    // console.log(data);
    // console.log(React,ReactDOM)
    const {name, locality, avgRating, cuisines, deliveryTime,cloudinaryImageId} = data.info;
    return(
        <div className="res-card">
            <div className="food-logo">
                <img src={`${CDN_URL}${cloudinaryImageId}`} alt="food image"></img>
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

export default ResturantCard;