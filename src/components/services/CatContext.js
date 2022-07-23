import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
    const [data, setData] = useState({});
     const [liked, addToLiked] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('https://api.thecatapi.com/v1/images/search');
            setData(response.data[0])
            };
        fetchData(data);
    }, []);

    return (
        <CatContext.Provider value={[ liked, addToLiked]}> 
            { children }
        </CatContext.Provider>
    )
}
