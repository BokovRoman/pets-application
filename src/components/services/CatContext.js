import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
    const [liked, addToLiked] = useState([]);
    const [favourites, addToFav] = useState([]); 
    const [disliked, addToDisliked] = useState([]);
    const [chunked, setChunked] = useState([]);
    const [cats, setCats] = useState({});
    const [breeds, setBreeds] = useState({});
    const [currBreed, setCurrBreed] = useState({});
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState('rand');
    
    useEffect(() => {
    const fetchData = async () => {
        const response = await axios('https://api.thecatapi.com/v1/images/search?limit=20');
        setCats(response.data);
        };
        fetchData(cats);
    }, []);

    // Fetching breeds by name
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('https://api.thecatapi.com/v1/breeds');
            setBreeds(response.data)
            };
        fetchData(breeds);
    }, []);

    return (
        <CatContext.Provider value={{ 
            likeKey: [ liked, addToLiked ], 
            favKey: [ favourites, addToFav ], 
            disKey: [ disliked, addToDisliked ], 
            chunkedKey: [ chunked, setChunked ],
            dogsKey: [ cats, setCats ],
            breedsKey: [ breeds, setBreeds ],
            currBreedKey: [ currBreed, setCurrBreed ],
            limitKey: [ limit, setLimit ],
            orderKey: [ order, setOrder ],
            }}> 
            { children }
        </CatContext.Provider>
       )
}
