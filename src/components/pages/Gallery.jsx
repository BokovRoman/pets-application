import styled from 'styled-components';
import Search from '../Search'; 
import Layout from '../Layout';
import GoBack from '../GoBack';
import Grid from 'components/Grid';

const Gallery = () => {
    return (
        <Layout flexCol> 
            <Search />
            <Wrapper>
                <GoBack btnContent="Galery" />
            </Wrapper>
            <Grid/>
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