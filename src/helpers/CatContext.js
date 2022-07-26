import  { useState, useEffect, createContext } from "react";
import axios from "axios";

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
  const [liked, addToLiked] = useState([]);
  const [favorites, addToFav] = useState([]);
  const [disliked, addToDisliked] = useState([]);
  const [chunked, setChunked] = useState([]);
  const [log, setLog] = useState([]);
  const [active, setActive] = useState(false);

  const [cats, setCats] = useState({});
  const [breeds, setBreeds] = useState({});
  const [currBreed, setCurrBreed] = useState({});
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("rand");

  const [selected, setSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState("Search for breeds by name");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://api.thecatapi.com/v1/breeds");
      setBreeds(response.data);
    };
    fetchData();
  }, []);

  return (
    <CatContext.Provider
      value={{
        likeKey: [liked, addToLiked],
        favKey: [favorites, addToFav],
        disKey: [disliked, addToDisliked],
        chunkedKey: [chunked, setChunked],
        catsKey: [cats, setCats],
        breedsKey: [breeds, setBreeds],
        currBreedKey: [currBreed, setCurrBreed],
        limitKey: [limit, setLimit],
        orderKey: [order, setOrder],
        logKey: [log, setLog],
        activeKey: [active, setActive],
        selectedKey: [selected, setSelected],
        searchTermKey: [searchTerm, setSearchTerm],
      }}
    >
      {children}
    </CatContext.Provider>
  );
};