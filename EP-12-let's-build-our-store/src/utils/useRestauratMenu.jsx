import { useState, useEffect, use } from 'react';

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    },[]);

    let json = {};
    const fetchMenu = async() => {
        try {
            const data = await fetch(`https://apis-92ocfwrxx-mishravishus-projects.vercel.app/api/swiggy?resId=${resId}`);
            console.log(data)
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