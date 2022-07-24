import styled from 'styled-components';
import axios from 'axios';
import { useState,useEffect, useContext } from 'react';
import { CatContext } from '../services/CatContext';
import Search from '../Search';
import Layout from '../Layout';
import GoBack from '../GoBack';
import BreedsSorting from 'components/BreedsSorting';

const Breeds = () => {
    const { catsKey, currBreedKey, limitKey, breedsKey, orderKey } = useContext(CatContext);
    const [cats, setCats] = catsKey;

    const [currBreed, setCurrBreed] = currBreedKey;
    const [limit, setLimit] = limitKey;
    const [breeds] = breedsKey;
    const [order, setOrder] = orderKey;
    const [chunked, setChunked] = useState([]);

    useEffect(() => {
        const breedID = currBreed.id
        const fetchData = async () => {
            const response = await axios(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_id=${breedID}`);
            setCats(response.data)
            };
        fetchData(cats)
    }, [limit]);

    useEffect(() => {
        const breedID = currBreed.id
        const fetchData = async () => {
            const response = await axios(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_id=${breedID}`);
            setCats(response.data);
            };
        fetchData(cats);
    }, [currBreed]);

    useEffect(() => {
        if (cats.length > 0) {
            const filteredCats = cats.filter( cat => cat.breeds.length > 0)
            const temporary = [...filteredCats];
          
            const result = []
            while (temporary.length > 0) {
                result.push(temporary.splice(0, 10))
            }
            setChunked(result);
        }
    }, [cats]);
    
    return (
        <Layout flexCol> 
            <Search />
            <Wrapper>
                <span>
                    <GoBack btnContent="Breeds" />
                    <BreedsSorting/>
                </span>
                <Masonry>
                     {chunked.map((tenCats, index) => 
                        <Pattern key={index}>
                            {tenCats.map((cat, index) => 
                                <GridItem key={cat.id} index={index} >
                                    <Img src={cat.url} />
                                    <Label>{cat.breeds[0].name}</Label>
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
    height: auto;

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
`
const GridItem = styled.div`
    width: 100%;
    height: 100%;
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