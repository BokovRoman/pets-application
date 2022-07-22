// import { BrowserRouter } from 'react-router-dom';
// import {  Routes } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme/theme";
import Home from './Home';
import Sidenav from './Sidenav/Sidenav';




export const App = () => {
  return (
    <div>
      <ThemeProvider theme = {lightTheme}>
          <Sidenav />
          <Home/>
        </ThemeProvider>
    </div>
  );
};
