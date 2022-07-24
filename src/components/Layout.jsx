import styled from "styled-components";

const Layout = ({children, flex, flexCol, maxH, uploadOpen}) => {
    return (
        <Section flex={flex} flexCol={flexCol} maxH={maxH} uploadOpen={uploadOpen}>
            {children}
        </Section>
    )
}

export default Layout;


const Section = styled.section`
    background: ${props => props.theme.bgMain};
    height: auto;
    min-height: 100vh;
    height: ${props => props.uploadOpen && '80vh'};
    overflow: ${props => props.uploadOpen && 'hidden'};
    max-height: ${props => props.maxH && '100vh'};
    height: ${props => props.maxH && '100vh'};
    width: 50%;
    padding: 1.8rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: ${props => props.flexCol ? 'column' : 'row'}
`