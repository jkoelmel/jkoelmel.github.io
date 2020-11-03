import React from 'react';
import {Routes} from './Routes'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Components/UI/Theme'
import './App.css';
import Header from './Components/Header/Header' //App bar

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Routes/>
        </ThemeProvider>
  );
}

export default App;