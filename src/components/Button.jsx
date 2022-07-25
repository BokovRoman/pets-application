import styled from 'styled-components';

const Button = ({btnContent, hidden, onClick,  bgText, noHover}) => {
    return (
        <Div hidden={hidden}>
            <Btn bgText={bgText} noHover={noHover} onClick={onClick} >{btnContent}</Btn>
        </Div>
    )
}

export default Button;

const Div = styled.div`
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 20px;
    display: ${ props => props.hidden && 'none' };
`


const Btn = styled.button`
    width: auto;
    height: 40px;
    background: #FF868E;
    margin-left: 10px;
    color: white;
    font-size: 12px;
    font-size: ${ props => props.bgText && "20px"};
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 10px;
    padding: 5px 30px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    &:hover {
    background: ${ props => props.noHover ? "#FF868E": "#FBE0DC"};
    color: ${ props => props.noHover ? "#FFFFFF": "#FF868E"}
  }
` 