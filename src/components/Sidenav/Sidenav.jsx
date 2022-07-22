import Navbar from 'components/Navbar';
import styled from 'styled-components';
import logo from '../../images/logo.svg';

const Sidenav = () => {
    return (
        <Section>
            <Wrapper>
                <Logo src={logo} alt="logo pets-paw" />
                <div>
                    <h1>Hi Intern!</h1>
                    <p>Welcome to MI 2022 Front-end test</p>    
                    <h3>Let's start using The Cat API</h3>
                    <Navbar/>
                </div>

            </Wrapper>
        </Section>
    )
}

export default Sidenav;


const Section = styled.section`
    background: ${props => props.theme.bgMain};
    height: 100vh;
    width: 50%;
`

const Wrapper = styled.div`
    margin: 2rem 8rem;
    h1 {
        margin-top: 5rem;
        color: ${props => props.theme.textPrim};
    }
    p {
        padding: 1.5rem 0rem;
        color: ${props => props.theme.textSec};
    }
    h3 {
        margin-top: 3.5rem;
        color: ${props => props.theme.textPrim};
    }
`

const Logo = styled.img`
    width: 7rem;
    height: auto;
` 
