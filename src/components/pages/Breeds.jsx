import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { BreedsContext } from '../services/BreedsContext';
import Search from '../Search';
import Layout from '../Layout';
import GoBack from '../GoBack';
import BreedsSorting from 'components/BreedsSorting';
import Loader from 'components/Loader';

const Breeds = () => {

    const { chunkedKey, currBreedKey, limitKey, catsKey, orderKey  } = useContext(BreedsContext);
    const [chunked, setChunked] = chunkedKey;
    const [currBreed] = currBreedKey;
    const [limit] = limitKey;
    const [cats, setCats] = catsKey;
    const [order] = orderKey;
    const [ loading, setLoading ] = useState();

    useEffect(() => {
        const breedID = currBreed.id
        const fetchData = async () => {
            setLoading(true);
            const response = await axios(`https://api.thecatapi.com/v1/images/search?limit=${limit}&order=${order}&breed_id=${breedID ? breedID : ''}`);
            setCats(response.data);
            setLoading(false);
            };
        fetchData();
    }, [limit, currBreed, order]);

    useEffect(() => {
        if (cats.length > 0) {
            setLoading(true);
            const temporary = [...cats];
            const result = []
            while (temporary.length > 0) {
                result.push(temporary.splice(0, 10))
            }
            setChunked(result);
            setLoading(false);

        }
    }, [cats]);
    
    return (
        <Layout flexCol> 
             <Search />
                <Wrapper>
                    <span>
                        <GoBack btnContent="Breeds" /> 
                        <BreedsSorting />
                    </span>
                    <Masonry>
                        {chunked.map((tenCats, index) => 
                            <Pattern key={index}>
                                {tenCats.map((cat, index) => 
                                    <GridItem key={cat.id} index={index} >
                                        <Img src={cat.url} />   
                                        { cat.breeds.length > 0 ? (
                                        <Label>{cat.breeds[0].name}</Label>
                                        ) : (
                                        <Label>No name provided</Label>
                                        ) }
                                    </GridItem>
                                    )}
                            </Pattern>
                        )}
                    </Masonry>
                </Wrapper>
        </Layout> 
    )
}

export default Breeds;

const Wrapper = styled.div`
    background: ${props => props.theme.bgBox};
    border-radius: 20px;
    width: 100%;
    height: 100%;

    span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }
`
const Masonry = styled.div`
    border-radius: 20px;
    width: 100%;
    height: auto;    
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
const Img = styled.img`
    width: 100%;
    height: 100%;
    min-height: 120px;
    border-radius: 20px;
    object-fit: cover;
    position: relative;
    z-index: 1;
    
    opacity: 1;
    transition: all 0.4s ease;
`

const Label = styled.div`
    display: none;
`
const GridItem = styled.div`
    width: 100%;
    max-height: 100%;
    max-height: ${(props) => props.index === 0 && "300px"};
    max-height: ${(props) => props.index === 3 && "300px"};
    max-height: ${(props) => props.index === 7 && "300px"};
    max-height: ${(props) => props.index === 8 && "300px"};
    color: white;
    border-radius: 20px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    opacity: 1;
    transition: all 0.3s ease;
    
    &:hover{
        background-color: rgba(255, 134, 142, 0.6);
    }
    &:hover ${Label} {
        display: block;
        position: absolute;
        bottom: 10px;
        text-align: center;
        z-index: 100;
        padding: 10px 5px;
        margin-left: 10px;
        margin-right: 10px;
        
        font-size: 20px;
        text-align: center;
        border-radius: 10px;
        width: 93%;
        justify-self: center;
        background-color: ${props => props.theme.bgBreed};
        color: #FF868E;
    }
    &:hover ${Img}{
        opacity: 0.3;
    }
`