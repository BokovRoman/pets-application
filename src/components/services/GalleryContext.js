import { useState, createContext } from 'react';

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [cats, setCats] = useState({});
    const [chunked, setChunked] = useState([]);
    const [order, setOrder] = useState('rand');
    const [type, setType] = useState('rand');
    const [currBreed, setCurrBreed] = useState({});
    const [limit, setLimit] = useState(10);

    return (
        <GalleryContext.Provider value={{ 
            chunkedKey: [ chunked, setChunked ],
            currBreedKey: [ currBreed, setCurrBreed ],
            limitKey: [ limit, setLimit ],
            orderKey: [ order, setOrder ],
            dogsKey: [ cats, setCats ],
            typeKey: [ type,  setType ],
            }}> 
            { children }
        </GalleryContext.Provider>
    )
}