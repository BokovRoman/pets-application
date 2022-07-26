import { useContext } from "react";
import { GalleryContext } from "./GalleryContext";

const FilterItems = () => {
  const {
    orderTitleKey,
    typeTitleKey,
    currBreedTitleKey,
    limitTitleKey,
    orderKey,
    typeKey,
    currBreedKey,
    limitKey,
  } = useContext(GalleryContext);

  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = orderKey;
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = typeKey;
  // eslint-disable-next-line no-unused-vars
  const [currBreed, setCurrBreed] = currBreedKey;
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = limitKey;

  // eslint-disable-next-line no-unused-vars
  const [orderTitle, setOrderTitle] = orderTitleKey;
  // eslint-disable-next-line no-unused-vars
  const [typeTitle, setTypeTitle] = typeTitleKey;
  // eslint-disable-next-line no-unused-vars
  const [currBreedTitle, setCurrBreedTitle] = currBreedTitleKey;
  // eslint-disable-next-line no-unused-vars
  const [limitTitle, setLimitTitle] = limitTitleKey;

  const handleFilterClick = (identifier, { id, name, state }) => {
    if (identifier === "order") {
      setOrder(state);
      setOrderTitle(name);
    } else if (identifier === "type") {
      setType(state);
      setTypeTitle(name);
    } else if (identifier === "breed") {
      setCurrBreed({ id: id, name: name });
      setCurrBreedTitle(name);
    } else if (identifier === "limit") {
      setLimit(state);
      setLimitTitle(name);
    }
  };

  return { handleFilterClick };
};

export default FilterItems;
