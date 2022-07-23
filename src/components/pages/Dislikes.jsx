import styled from 'styled-components';
import Layout from '../Layout';
import Search from '../Search'; 
import GoBack from '../GoBack';

const Dislikes = () => {
    return (
        <Layout flexCol>
            <Search />
            <Wrapper>
                <GoBack btnContent="Dislikes" />
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