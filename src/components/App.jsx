// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme/theme";
import Sidenav from './Sidenav/Sidenav';



export const App = () => {
  return (
    <div>
      <ThemeProvider theme = {lightTheme}>
        <Sidenav />
          <div>
              <h1>Hi intern!</h1>
              <p>Welcome to MI 2022 Front-end test</p>
          </div>
      </ThemeProvider>
    </div>
  );
};
