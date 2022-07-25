import React from 'react'
import styled from 'styled-components'
import { Link} from "react-router-dom";
import { useEffect, useState} from 'react';


const NavItem = ({imgSrc, btnContent, url,alt, green, yellow, path}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (url === path) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [url, path]);

    return (
        <Wrapper 
            imgSrc={imgSrc} 
            btnContent={btnContent} 
            url={url} 
            green={green}
            yellow={yellow}
            active={active}
        >
            <Link to={url}>
                <Div
                green={green}
                yellow={yellow}
                active={active}
                >
                <img src={imgSrc} alt={alt} />
                </Div>
                <A active={active}>{btnContent}</A>
            </Link>
        </Wrapper>
    )
}

export default NavItem;

const Div = styled.div`
    background-color: #b4b7ff;
    background-color: ${props => props.green && '#97EAB9'};
    background-color: ${props => props.yellow && '#FFD280'};
    width: 138px;
    height: 198px;
    padding: 1.3rem 1rem;
    margin-bottom: 1rem;
    border-radius: 20px;
    border: 5px solid rgba(255, 255, 255, 0.6);
    border: ${props => props.active && '5px solid #FBE0DC'};
    transition: all 0.3s ease;   
    display: flex;
    justify-content: center;
    align-items: center;
`

const A = styled.div`
    width: 100%;
    max-height: 36px;
    background: ${props => props.theme.bgBox};
    background: ${props => props.active && '#FF868E'};
    color: #FF868E;
    color: ${props => props.active && 'white'};
    font-size: 14px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 0px;
    border-radius: 10px;
    transition: all 0.3s ease;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover ${A} {
        background: #FBE0DC;
        background: ${props => props.active && '#FF868E'};
    }
    &:hover ${Div} {
        border: 5px solid #FFFFFF;
        border: ${props => props.active && '5px solid #FBE0DC'};
    }
`