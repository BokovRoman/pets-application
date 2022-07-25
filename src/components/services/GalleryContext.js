import { useState, createContext } from 'react';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [cats, setCats] = useState({});
    const [chunked, setChunked] = useState([]);
    const [order, setOrder] = useState('rand');
    const [type, setType] = useState('static');
    const [currBreed, setCurrBreed] = useState({});
    const [limit, setLimit] = useState(5);

    return (
        <GalleryContext.Provider value={{ 
            currBreedKey: [ currBreed, setCurrBreed ],
            limitKey: [ limit, setLimit ],
            catsKey: [ cats, setCats ],
            chunkedKey: [chunked, setChunked],
        }}> 
            { children }
        </GalleryContext.Provider>
    )
}