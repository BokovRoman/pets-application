// import { BrowserRouter } from 'react-router-dom';
import {  Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme/theme";
import Home from './Home';
import Sidenav from './Sidenav/Sidenav';
import Voting from './Voting';




export const App = () => {
  return (
    <Div>
      <ThemeProvider theme = {lightTheme}>
        <Sidenav />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/voting" element={<Voting/>}/>
          <Route exact path="/breeds" element={<Voting />} />
          <Route exact path="/gallery" element={<Voting/>}/>
        </Routes>
        </ThemeProvider>
    </Div>
  );
};


const Div=styled.div`
  display:flex;
`