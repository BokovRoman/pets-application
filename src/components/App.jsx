import {  Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme} from "../theme/theme";
import Home from './Home';
import Sidenav from './Sidenav/Sidenav';
import Voting from './Voting';
import Likes from './pages/Likes';
import Favourites from './pages/Favourites';
import Dislikes from './pages/Dislikes';
import Breeds from './pages/Breeds';
import { CatProvider } from './services/CatContext';
import { BreedsProvider } from './services/BreedsContext';
import { GalleryProvider } from './services/GalleryContext';
import Gallery from './pages/Gallery';


export const App = () => {
  return (
      <Div>
        <ThemeProvider theme = {lightTheme}>
        <Sidenav />
          <CatProvider>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/voting" element={<Voting/>}/>
              <Route exact path="/breeds" element={<BreedsProvider><Breeds/></BreedsProvider>} />
              <Route exact path="/gallery" element={ <GalleryProvider><Gallery/></GalleryProvider>} />
              <Route exact path="/likes" element={<Likes />} />
              <Route exact path="/favourites" element={<Favourites/>}/>
              <Route exact path="/dislikes" element={<Dislikes/>}/>
            </Routes>
          </CatProvider>
        </ThemeProvider>
      </Div>
  );
};


const Div=styled.div`
  display:flex;
`