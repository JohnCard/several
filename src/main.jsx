import React from 'react';
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import './index.css'
import App from './App'
import WeatherForm from './components/WeatherForm'
import Movies from './components/Movies'
import Sites from './components/Sites'
import Pokedex from './components/Pokedex';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <CssBaseline /> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='/weather' element={<WeatherForm/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/cities' element={<Sites/>} />
          <Route path='/pokedex' element={<Pokedex/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
)
