import { useState, useEffect } from 'react';
import resData from './resData.json';

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await fetch(`https://swiggy-clone-5sy64gpxe-mishravishus-projects.vercel.app/api/menu?resId=${resId}`);
                const resDataApi = await data.json();
                setResInfo(resDataApi?.data); // Use API data if fetch succeeds
                console.log('useRestaurantMenu', resDataApi?.data); // Debugging
            } catch (error) {
                console.log('Error while Fetching restaurants menu data, using local resData.json', error);
                setResInfo(resData.data); // Fallback to local resData.json
            }
        };
        fetchMenu();
    }, [resId]);

    return resInfo;
}

export default useRestaurantMenu;