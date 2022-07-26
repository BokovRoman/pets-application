import { useState, useContext } from "react";

import {  Routes, Route, Navigate } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme/theme";
import { CatContext } from "./helpers/CatContext";
import { BreedsProvider } from "./helpers/BreedsContext";
import { GalleryProvider } from "./helpers/GalleryContext";

import Sidenav from "./components/Sidenav/Sidenav";
import Home from "./routes/Home/Home";
import Voting from "./routes/Voting/Voting";
import Breeds from "./routes/Breeds/Breeds";
import Gallery from "./routes/Gallery/Gallery";
import Liked from "./routes/Liked";
import Favorites from "./routes/Favorites";
import Disliked from "./routes/Disliked";
import Selected from "./routes/Selected/Selected";
import SearchResult from "./routes/Search/SearchResult";
import Search from "./components/Searchbar/Search";

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const { searchTermKey } = useContext(CatContext);
  const [searchTerm, setSearchTerm] = searchTermKey;
  const [isOpen, setIsOpen] = useState(false);

  return (
      <ThemeProvider theme={theme}>
        <DocumentBody>
          <Sidenav
            theme={theme}
            setTheme={setTheme}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <StyledSection flexCol>
        <Search isOpen={isOpen} setIsOpen={setIsOpen} />
          <Routes>
              {/* <Route exact path="/" element={<Home />} /> */}
              <Route exact path="/voting" element={<Voting/>}/>
              <Route exact path="/breeds" element={<BreedsProvider><Breeds /></BreedsProvider>} />
              <Route exact path="/breeds/selected" element={<Selected/>} />
              <Route exact path="/gallery" element={ <GalleryProvider><Gallery/></GalleryProvider>} />
              <Route exact path="/liked" element={<Liked />} />
              <Route exact path="/favorites" element={<Favorites/>}/>
              <Route exact path="/disliked" element={<Disliked />} />
              <Route exact path="/search" element={<SearchResult />} />
          </Routes>
          </StyledSection>
        {searchTerm !== "Search for breeds by name" && (
            <Navigate push to="/search" />
          )}
        </DocumentBody>
      </ThemeProvider>
  );
}

export default App;

const DocumentBody = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledSection = styled.div`
  background: ${(props) => props.theme.bgMain};
  height: auto;
  min-height: 100vh;
  max-height: auto;
  width: 50%;
  padding: 1.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: ${(props) => (props.flexCol ? "column" : "row")};

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
