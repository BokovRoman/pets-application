import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const BreedsContext = createContext();

export const BreedsProvider = ({ children }) => {
    const [cats, setCats] = useState({});
    const [chunked, setChunked] = useState([]);
    const [currBreed, setCurrBreed] = useState({});
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState('rand');
    const [breeds, setBreeds] = useState({});
    const [breedTitle, setBreedTitle] = useState("All breeds");
    const [limitTitle, setLimitTitle] = useState(10);
    const [breedsOpen, setBrOpen] = useState(false);
    const [limitOpen, setLimitOpen] = useState(false); 

      useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://api.thecatapi.com/v1/breeds");
      setBreeds(response.data);
    };
    fetchData();
      }, []);
    
    return (
        <BreedsContext.Provider value={{ 
            chunkedKey: [ chunked, setChunked ],
            currBreedKey: [ currBreed, setCurrBreed ],
            limitKey: [ limit, setLimit ],
            orderKey: [ order, setOrder ],
            catsKey: [ cats, setCats ],
            breedsOpenKey: [ breedsOpen, setBrOpen ],
            limitOpenKey: [limitOpen, setLimitOpen],
            breedsKey: [breeds, setBreeds],
            breedTitleKey: [breedTitle, setBreedTitle],
            
            limitTitleKey: [limitTitle, setLimitTitle],
            }}> 
            { children }
        </BreedsContext.Provider>
    )
}
