import * as React from 'react';
import { LoadingButton } from "@mui/lab"
import { Box, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// define yout api key 
let api_key = '865d9c05a8c04703b68184104242507'
// apply your api key for main url
const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=`

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function WeatherForm() {
  // variable to keep city parameter from the main form
  const [city, setCity] = useState('')
  // set a loading variable (true/false)
  const [loading, setLoading] = useState(false);
  // error dictionary
  const [error, setError] = useState({
    error: false,
    message: '',
  })
  // weather dictionary
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temp: '',
    condition: '',
    icon: '',
    conditionText: '',
  })

  // define submit action
  const onSubmit = async (e) => {
    e.preventDefault()
    // set loading
    setLoading(true)
    // set error values
    setError({
      error: false,
      message: ''
    })
    // ? well done?
    try {
      if(!city.trim()) throw { message: 'Obligatorio' }
      // pull main info from api weather
      const response = await fetch(`${API_WEATHER+city}`)
      const data = await response.json()
      // ! bad request? throw a error message
      if(data.error) throw {message: data.error.message}
      // main weather infor dictionary
      setWeather({
        // city name
        city: data.location.name,
        // current country
        country: data.location.country,
        // current temperature
        temp: data.current.temp_c,
        // main actual condition
        condition: data.current.condition.code,
        // context city image
        icon: data.current.condition.icon,
        // main condition text
        conditionText: data.current.condition.text,
      })
      // ! something went wrong!
    }catch (error) {
      // set error values
      setError({
        error: true,
        message: error.message
      })
      // * finally action
    } finally{
      setLoading(false)
    }
  }
  return (
    <>
    {/* main title */}
      <Typography
      variant='h3'
      component='h1'
      align='center'
      gutterBottom
      >
        Weather App
      </Typography>
      {/* main form template */}
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      component='form'
      autoComplete='off'
      onSubmit={onSubmit}
      >
        {/* text field */}
        <TextField
        id='city'
        label='City'
        variant='outlined'
        size='small'
        required
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={error.error}
        helperText={error.message}
        />
        {/* submit button */}
        <LoadingButton
        type='submit'
        variant='contained'
        loading={loading}
        loadingIndicator='Loading...'
        >
          Search
        </LoadingButton>
      </Box>
      {/* if you made a good request, this will show main info about a city weather */}
      {weather.city && (
        // box grid container for city info weather
        <Box
        sx={{
          mt: 2,
          display: 'grid',
          gap: 2,
          textAlign: 'center'
        }}
        >
          {/* main title for weather info */}
          <Typography
          variant='h4'
          component='h2'
          >
            {weather.city}, {weather.country}
          </Typography>
          {/* context image */}
          <Box
          component='img'
          alt={weather.conditionText}
          src={weather.icon}
          sx={{margin: '0 auto'}}
          />
          {/* temperature container */}
          <Typography
          variant='h5'
          component='h3'
          >
            {weather.temp} °C
          </Typography>
          {/* condition city weather */}
          <Typography
          variant='h6'
          component='h4'
          >
            {weather.conditionText}
          </Typography>

        </Box>
      )}
      {/* api url */}
      <Typography
      textAlign='center'
      sx={{mt: 2, fontSize: '10px'}}
      >
        Powered by: {' '}
        <a
        href='https://www.weatherapi.com/'
        title='Weather API'
        >
          WeatherAPI.com</a>
      </Typography>
    </>
  )
}

export default WeatherForm




