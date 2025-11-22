import { useState, useEffect, use } from 'react';

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    },[]);

    let json = {};
    const fetchMenu = async() => {
        try {
            const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.57590&lng=77.33450&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);

            json = await data.json();
            console.log(json);
        } catch (error) {
            console.log('Error while Fetching restaurants menu data', error);
        }
        setResInfo(json);
        console.log('useRestaurantMenu', json); // Debugging line to check the fetched data
    }
    return resInfo;
}

export default useRestaurantMenu;