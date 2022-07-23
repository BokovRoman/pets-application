import styled from 'styled-components';
import cat from '../images/cat-voting.png';

const Grid = () => {
    return (
        <GridContainer>
            <GridItem one>
                <Img src={cat} alr="cat" lg />
            </GridItem>
            <GridItem two>
                <Img src={cat} alr="cat" sm/>
            </GridItem>
            <GridItem three>
                <Img src={cat} alr="cat" sm/>
            </GridItem>
            <GridItem four>
                <Img src={cat} alr="cat" lg />
            </GridItem>
            <GridItem five>
                <Img src={cat} alr="cat" sm />
            </GridItem>
        </GridContainer>
    )
}

export default Grid;


const GridContainer = styled.div`
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
    height: 100%;
    height: ${props => props.sm && '140px'};
    height: ${props => props.lg && '300px'};
    border-radius: 20px;
` 