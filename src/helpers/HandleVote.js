import { useContext } from "react";
import { CatContext } from "./CatContext";

const HandleVote = () => {
  const getTime = () => {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    let time = h + ":" + m;
    return time;
  };

  const { likeKey, favKey, disKey, logKey, activeKey } = useContext(CatContext);
  // eslint-disable-next-line no-unused-vars
  const [liked, addToLiked] = likeKey;
  const [favorites, addToFav] = favKey;
  // eslint-disable-next-line no-unused-vars
  const [disliked, addToDisliked] = disKey;
  // eslint-disable-next-line no-unused-vars
  const [log, setLog] = logKey;
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = activeKey;

  const handleClick = (type, randomCat) => {
    let time = getTime();
    if (type === "like") {
      addToLiked((prevLiked) => [...prevLiked, randomCat]);
      setLog((prevLog) => [
        ...prevLog,
        {
          id: randomCat.id,
          content: "was added to Likes",
          type: "like",
          time: time,
        },
      ]);
    } else if (type === "dis") {
      addToDisliked((prevLog) => [...prevLog, randomCat]);
      setLog((prevLog) => [
        ...prevLog,
        {
          id: randomCat.id,
          content: "was added to Disliked",
          type: "dis",
          time: time,
        },
      ]);
    } else {
      if (favorites.indexOf(randomCat) === -1) {
        setActive(true);
        addToFav((prevFavorites) => [...prevFavorites, randomCat]);
        setLog((prevLog) => [
          ...prevLog,
          {
            id: randomCat.id,
            content: "was added to Favorites",
            type: "fav",
            time: time,
          },
        ]);
      } else {
        setActive(false);
        favorites.pop();
        setLog((prevLog) => [
          ...prevLog,
          {
            id: randomCat.id,
            content: "was removed from Favourites",
            type: "",
            time: time,
          },
        ]);
      }
    }
  };

  const favFromGallery = (cat) => {
    if (favorites.indexOf(cat) === -1) {
      setActive(true);
      addToFav((prevFavorites) => [...prevFavorites, cat]);
      console.log("Added to Favs");
    } else {
      setActive(false);
      let index = favorites.indexOf(cat);
      let newFav = [...favorites];
      newFav.splice(index, 1);
      addToFav(newFav);
      console.log("Removed from Favs");
    }
  };

  return { handleClick, getTime, favFromGallery };
};

export default HandleVote;
