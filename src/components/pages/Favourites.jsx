import styled from 'styled-components';
import { useContext, useEffect, useState  } from 'react';
import { CatContext } from '../services/CatContext';
import Layout from '../Layout';
import Search from '../Search'; 
import GoBack from '../GoBack';
import NoItemFound from './NoItemFound';
import Action from '../Action';
import HandleVote from 'components/HandleVote';

const Favorites = () => {
    const { favKey} = useContext(CatContext);
    const [favourites, addToFav] = favKey;
    const [chunked, setChunked] = useState([]);
    const [favouritesLog, setFavouritesLog] = useState([]);
    const { getTime } = HandleVote();


    const removeFromFavourites = (id, index) => {
        let newFav = [...favourites];
        newFav.splice(index, 1);
        addToFav(newFav);
        setFavouritesLog(prevLog => [...prevLog, { id: id, content: "was removed from Favourites", type: "", time: getTime()}])
    }

    useEffect(() => {
        if (favourites.length >= 0) {
            const temporary = [...favourites];
            const result = []
            while (temporary.length > 0) {
                result.push(temporary.splice(0, 10))
            }
            setChunked(result);
        }
    }, [favourites]);

    let message;
    if ( favourites.length === 0 ) {
        message = <NoItemFound />
    }  

    return (
        <Layout flexCol>
            <Search />
            <Wrapper>
                <GoBack btnContent="Favourites"/>
                 { message }
                {chunked.map((tenCats, index) => <Pattern key={index}>
                    {tenCats.map((cat, index) =>
                        <GridItem key={cat.id} index={index} >
                            <Img src={cat.url} />
                            <Label onClick={() => removeFromFavourites(cat.id,index)} >
                                    <svg viewBox="0 0 30 30"> 
                                        <path d="M8.07107 2C3.61354 2 0 5.61354 0 10.0711C0 12.2116 0.850339 14.2646 2.36396 15.7782L14.2929 27.7071C14.6834 28.0976 15.3166 28.0976 15.7071 27.7071L27.636 15.7782C29.1497 14.2646 30 12.2116 30 10.0711C30 5.61354 26.3865 2 21.9289 2C19.7884 2 17.7354 2.85034 16.2218 4.36396L15 5.58579L13.7782 4.36396C12.2646 2.85034 10.2116 2 8.07107 2Z"></path>
                                    </svg>
                            </Label>
                        </GridItem>)}
                   </Pattern>)
                }
                <ActionLog>
                        { favouritesLog.map( (item, index) => <Action 
                            key={index}
                            id={item.id} 
                            content={item.content} 
                            type={item.type} 
                            time={item.time} 
                        />) }
                    </ActionLog>
            </Wrapper>
        </Layout>
    )
}

export default Favorites;

const Img = styled.img`
    width: 100%;
    height: 100%;
    min-height: 120px;
    height: ${props => props.index === 0 && '280px'};
    border-radius: 20px;
    object-fit: cover;
    position: relative;
    z-index: 1;
    opacity: 1;
    transition: all 0.4s ease;
`

const Label = styled.div`
    display: none;
    svg {
        width: 20px;
        height: 20px;
        fill: #FF868E;
    }
`

const Wrapper = styled.div`
    background: ${props => props.theme.bgBox};
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
`
const Pattern = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 32%);
    grid-template-rows: repeat(3, auto); 
    column-gap: 20px;
    row-gap: 20px;
    grid-template-areas: 
        "one two three"
        "one four four"
        "five four four"
        "six seven eight"
        "nine nine eight"
        "nine nine ten";
    justify-content: space-evenly;
`

const GridItem = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 20px;
    position: relative;
    &:hover{
        background-color: rgba(255, 134, 142, 0.6);
    }
    &:hover ${Label} {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        z-index: 100;
        padding: 10px 5px;
        border-radius: 10px;
    
        background-color: ${props => props.theme.bgBreed};
        color: #FF868E;
    }
    &:hover ${Img}{
        opacity: 0.3;
    }

    grid-area: ${props => props.index === 0 && 'one'};
    grid-area: ${props => props.index === 1 && 'two'};
    grid-area: ${props => props.index === 2 && 'three'};
    grid-area: ${props => props.index === 3 && 'four'};
    grid-area: ${props => props.index === 4 && 'five'};
    grid-area: ${props => props.index === 5 && 'six'};
    grid-area: ${props => props.index === 6 && 'seven'};
    grid-area: ${props => props.index === 7 && 'eight'};
    grid-area: ${props => props.index === 8 && 'nine'};
    grid-area: ${props => props.index === 9 && 'ten'};
`

const ActionLog = styled.div`
    margin: 10px 0px;
    width: 100%;
` 