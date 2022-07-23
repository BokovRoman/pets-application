import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
    const [liked, addToLiked] = useState([]);
    const [favourites, addToFav] = useState([]); 
    const [disliked, addToDisliked] = useState([]);
    const [chunked, setChunked ] = useState([]);

    useEffect(() => {
        if (liked.length > 0) {
            const temporary = [...liked];
            const result = []
            while (temporary.length > 0) {
                result.push(temporary.splice(0, 10))
                // debugger
            }
            setChunked(result)
        }
    }, [liked]);

    return (
        <CatContext.Provider value={{ likeKey: [liked, addToLiked], favKey: [favourites, addToFav], disKey: [disliked, addToDisliked], chunkedKey: [chunked, setChunked]} }> 
            { children }
        </CatContext.Provider>
    )
}
