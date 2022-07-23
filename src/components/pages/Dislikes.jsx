import styled from 'styled-components';
import { useContext } from 'react';
import { CatContext } from '../services/CatContext';
import Layout from '../Layout';
import Search from '../Search'; 
import GoBack from '../GoBack';
import NoItemFound from './NoItemFound';

const Dislikes = () => {
    const { disKey } = useContext(CatContext);
    const [disliked] = disKey;
    
    let message;
    if ( disliked.length === 0 ) {
        message = <NoItemFound />
    }  

    return (
        <Layout flexCol>
            <Search />
            <Wrapper>
                <GoBack btnContent="Dislikes" />
                { message }
                <Pattern>
                    {disliked.map(cat => 
                        <GridItem >
                            <Img src={cat.url} width="300px" />
                        </GridItem>)}
                </Pattern>
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
        "five four four";
    justify-content: space-evenly;
`

const GridItem = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 20px;
    grid-area: ${props => props.one && 'one'};
    grid-area: ${props => props.two && 'two'};
    grid-area: ${props => props.three && 'three'};
    grid-area: ${props => props.four && 'four'};
    grid-area: ${props => props.five && 'five'};
`

const Img = styled.img`
    width: 100%;
    height: 140px;
    /* height: ${props => props.sm && '140px'}; */
    height: ${props => props.lg && '300px'};
    border-radius: 20px;
` 