import styled from 'styled-components';
import { useEffect,useContext } from 'react';
import { CatContext } from '../services/CatContext';
import Layout from '../Layout';
import Search from '../Search'; 
import GoBack from '../GoBack';
import NoItemFound from './NoItemFound';

const Dislikes = () => {
    const { disKey, chunkedKey  } = useContext(CatContext);
    const [disliked] = disKey;
    const [chunked, setChunked] = chunkedKey;

    useEffect(() => {
        if (disliked.length > 0) {
            const temporary = [...disliked];
            const result = []
            while (temporary.length > 0) {
                result.push(temporary.splice(0, 10))
            }
            setChunked(result);
        }
    }, [disliked]);

    let message;
    if ( disliked.length === 0 ) {
        message = <NoItemFound />
    }  

    return (
        <Layout flexCol>
            <Search />
            <Wrapper>
                <GoBack btnContent="Disliked" />
                {message}
                {chunked.map(tenCats => <Pattern>
                    {tenCats.map((cat, index) =>
                        <GridItem key={cat.id} index={index} >
                            <Img src={cat.url} />
                        </GridItem>)}
                </Pattern>)
            }
            </Wrapper>
        </Layout>
    )
}

export default Dislikes;

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