import { useContext } from "react";
import { BreedsContext } from "./BreedsContext";

const FilterItems = () => {
  const {
    // eslint-disable-next-line no-unused-vars
    chunkedKey,
    currBreedKey,
    limitKey,
    orderKey,
    // eslint-disable-next-line no-unused-vars
    catsKey,
    breedsOpenKey,
    limitOpenKey,
    // eslint-disable-next-line no-unused-vars
    breedsKey,
    breedTitleKey,
    limitTitleKey,
  } = useContext(BreedsContext);

  // eslint-disable-next-line no-unused-vars
  const [currBreed, setCurrBreed] = currBreedKey;
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = limitKey;
  const [order, setOrder] = orderKey;
  // eslint-disable-next-line no-unused-vars
  const [breedsOpen, setBrOpen] = breedsOpenKey;
  // eslint-disable-next-line no-unused-vars
  const [limitOpen, setLimitOpen] = limitOpenKey;
  // eslint-disable-next-line no-unused-vars
  const [breedTitle, setBreedTitle] = breedTitleKey;
  // eslint-disable-next-line no-unused-vars
  const [limitTitle, setLimitTitle] = limitTitleKey;

  const handleFilterClick = (identifier, item) => {
    if (identifier === "Limit: 10") {
      setLimit(item.num);
      setLimitOpen(false);
      setLimitTitle(item.num);
    } else if (identifier === "All breeds") {
      setCurrBreed({ id: item.id, name: item.name });
      setBrOpen(false);
      setBreedTitle(item.name);
    } else {
      console.log("Error");
    }
  };

  const changeOrder = (value) => {
    if (value === "ASC") {
      order === "asc" ? setOrder("rand") : setOrder("asc");
    } else if (value === "DESC") {
      order === "desc" ? setOrder("rand") : setOrder("desc");
    }
  };

  return { handleFilterClick, changeOrder };
};

export default FilterItems;
