import { useContext } from 'react';
import { CatContext } from './services/CatContext';

const HandleVote = () => {

    const getTime = () => {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        h = (h<10) ? '0' + h : h;
        m = (m<10) ? '0' + m : m;
        let time = h + ':' + m;
        return time
    };

    const { likeKey, favKey, disKey, logKey, activeKey } = useContext(CatContext);
    const [liked, addToLiked] = likeKey;
    const [favourites, addToFav] = favKey;
    const [disliked, addToDisliked] = disKey;
    const [log, setLog] = logKey;
    const [active, setActive] = activeKey;

    const handleClick = (type, randomCat) => {
        let time = getTime() 
        if (type === "like") {
            addToLiked(prevLiked => [...prevLiked, randomCat])
            setLog(prevLog => [...prevLog, { id: randomCat.id, content: "was added to Likes", type: "like", time: time }])
        } else if (type === "dis") {
            addToDisliked(prevLog => [...prevLog, randomCat])
            setLog(prevLog => [...prevLog, { id: randomCat.id, content: "was added to Dislikes", type: "dis", time: time}])
        } else {
            if (favourites.indexOf(randomCat) === -1) {
                setActive(true)
                addToFav(prevFavourites => [...prevFavourites, randomCat])
                setLog(prevLog => [...prevLog, { id: randomCat.id, content: "was added to Favorites", type: "fav", time: time }])
            } else {
                setActive(false)
                favourites.pop()
                setLog(prevLog => [...prevLog, { id: randomCat.id, content: "was removed from Favourites", type: "", time: time}]) 
            }
        }
    }

    const favFromGallery = (cat) => {
        if (favourites.indexOf(cat) === -1) {
            addToFav(prevFavourites => [...prevFavourites, cat])
            console.log("Added to Favs")
        } else {
            let index = favourites.indexOf(cat)
            let newFav = [...favourites]
            newFav.splice(index, 1);
            addToFav(newFav)
            console.log("Removed from Favs")
        }
    }
    return {handleClick, getTime, favFromGallery}
}

export default HandleVote;