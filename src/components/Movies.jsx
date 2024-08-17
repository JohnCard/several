import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from "@mui/lab"
import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// main api key
let apiKey = import.meta.env.VITE_MOVIE_API_KEY
// get base img url
let img = import.meta.env.VITE_MAIN_IMG_MOVIE
// get url base for movie api
let urlBase = import.meta.env.VITE_BASE_MOVIES

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(title, voteCount, date, voteAverage) {
  return { title, voteCount, date, voteAverage };
}

let movieRows = []

function Movies() {
  // movie text field parameter
  const [movie, setMovie] = useState('')
  // loading variable (true/false)
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([])
  // error dictionary
  const [error, setError] = useState({
    error: false,
    message: '',
  })
  // submit action
  const onSubmit = async (e) => {
    e.preventDefault()
    // set load
    setLoading(true)
    // set error values
    setError({
      error: false,
      message: ''
    })
    // ? well done?
    try {
      // ! empty request
      if(!movie.trim()) throw { message: 'Obligatorio' }
      // make a api call
      const response = await fetch(`${urlBase}?api_key=${apiKey}&query=${movie}`)
      // get main data
      const data = await response.json()
      // set list movies
      movieRows = []
      data.results.forEach((movie_index) => {
        movieRows.push(createData(movie_index.title, movie_index.vote_count,
          movie_index.release_date, movie_index.vote_average
        ))
      })
      setMovies(movieRows)
      // ! bad request
      if(data.error) throw {message: data.error}
      // ! something went wrong
    }catch (error) {
      // set error values
      setError({
        error: true,
        message: error.message
      })
      // * final action
    } finally{
      // set load
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
        Loco for movies
      </Typography>
      {/* main template form */}
      <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        {/* movie text field */}
        <TextField 
        id='movie'
        label='Movie'
        variant="outlined" 
        size='small'
        required 
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        error={error.error}
        helperText={error.message} />
        {/* button submit */}
        <LoadingButton
        type='submit'
        variant='contained'
        loading={loading}
        loadingIndicator='Loading…'
        >
          Search
        </LoadingButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Vote count</StyledTableCell>
              <StyledTableCell align="right">Release date</StyledTableCell>
              <StyledTableCell align="right">Vote average</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.voteCount}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.voteAverage}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Movies