import styled from 'styled-components';

// import Grid from '../layout/Grid'
import Search from '../Search'; 
import Layout from '../Layout';
import GoBack from '../GoBack';

const Gallery = () => {
    return (
        <Layout flexCol> 
            <Search />
            <Wrapper>
                <GoBack btnContent="Galery" />
            </Wrapper>
        </Layout>
    )
}

export default Gallery

const Wrapper = styled.div`
    background: ${props => props.theme.bgBox};
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 20px;
` 