import React from "react";
import { Routes } from "./Routes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Components/UI/Theme";
import "./App.css";
import Header from "./Components/Header/Header"; //App bar
import { BrowserRouter } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
