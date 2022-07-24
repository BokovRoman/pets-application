import { useState,createContext } from 'react';

export const BreedsContext = createContext();

export const BreedsProvider = ({ children }) => {
    const [cats, setCats] = useState({});
    const [chunked, setChunked] = useState([]);
    const [currBreed, setCurrBreed] = useState({});
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState('rand');

    const [breedsOpen, setBrOpen] = useState(false);
    const [limitOpen, setLimitOpen] = useState(false); 

    return (
        <BreedsContext.Provider value={{ 
            chunkedKey: [ chunked, setChunked ],
            currBreedKey: [ currBreed, setCurrBreed ],
            limitKey: [ limit, setLimit ],
            orderKey: [ order, setOrder ],
            catsKey: [ cats, setCats ],
            breedsOpenKey: [ breedsOpen, setBrOpen ],
            limitOpenKey: [ limitOpen, setLimitOpen ]
            }}> 
            { children }
        </BreedsContext.Provider>
    )
}
