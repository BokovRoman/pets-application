import { useEffect, useState, useContext } from 'react';
import { CatContext } from '../services/CatContext';
import styled from 'styled-components';
import axios from 'axios';
import Search from '../Search'; 
import Layout from '../Layout';
import GoBack from '../GoBack';
import GallerySort from '../GallerySort';



const Gallery = () => {
    const [cats, setCats] = useState({});
    const [chunked, setChunked] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('https://api.thecatapi.com/v1/images/search?limit=20');
            setCats(response.data);
            };
        fetchData(cats);
    }, []);

    useEffect(() => {
        if (cats.length > 0) {
            const temporary = [...cats];
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
                <Container>
                    <GoBack btnContent="Galery" /> 
                    <Upload>
                        <svg viewBox="0 0 16 16"> 
                            <path d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"></path>
                        </svg>
                        Upload
                    </Upload> 
                </Container>
                <GallerySort />
                <Masonry>
                    {chunked.map(tenCats => <Pattern>
                        {tenCats.map((cat, index) =>
                            <GridItem key={cat.id} index={index} >
                                <Img src={cat.url} />
                            </GridItem>)}
                    </Pattern>)
                    }
                </Masonry>
            </Wrapper>
        </Layout>
    )
}

export default Gallery;


const Wrapper = styled.div`
    background: ${props => props.theme.bgBox};
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Upload = styled.button`
    border-radius: 10px;
    border: none;
    height: 40px;
    background: #FBE0DC;
    color: #FF868E;
    min-width: 143px;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease; 
    &:hover {
        background: #FF868E;
        color: #FFFFFF;
    }
@@ -168,44 +115,26 @@
    svg {
        fill: #FF868E;
        width: 16px;
        height: 16px; 
        margin-right: 0.5rem;
    }
    &:hover svg {
        fill: #FFFFFF;
    }
`
const Flex = styled(Container)`
    padding: 10px;
    justify-content: space-evenly;
    align-items: center;
    background-color: #F8F8F7;
    border-radius: 20px;
    padding: 10px;
`


const Masonry = styled.div`
    background: ${props => props.theme.bgBox};
    border-radius: 20px;
    width: 100%;
    height: auto;
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
const Img = styled.img`
    width: 100%;
    height: 100%;
    min-height: 120px;
    height: ${props => props.index === 0 && '280px'};
    border-radius: 20px;
    object-fit: cover;
`