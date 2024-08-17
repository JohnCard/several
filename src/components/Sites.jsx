import { barcelona, roma, paris, londres } from './info'
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const cities = [barcelona, roma, paris, londres]
let context = {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function Sites() {

  const [city, setCity] = useState({})
  function addContext(city){
    switch (city) {
      case ('barcelona'):
        context = cities[0]
        break
      case ('roma'):
        context = cities[1]
        break
      case ('paris'):
        context = cities[2]
        break
      case ('londres'):
        context = cities[3]
        break
    }
    setCity(context)
  }

  

  return (
    <>
    <Paper sx={{ width: 300, marginTop: 2, marginBottom: 3, marginLeft: 5 }}>
      <MenuList>
        <MenuItem onClick={() => addContext('barcelona')} >
          <Typography variant="inherit">Barcelona</Typography>
        </MenuItem>
        <MenuItem onClick={() => addContext('roma')} >
          <Typography variant="inherit" >Roma</Typography>
        </MenuItem>
        <MenuItem onClick={() => addContext('paris')} >
          <Typography variant="inherit" >Paris</Typography>
        </MenuItem>
        <MenuItem onClick={() => addContext('londres')} >
          <Typography variant="inherit" >Londres</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
    {city &&  <Box sx={{ width: 200, marginLeft: 5, marginBottom: 6 }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        <Item>
          <Typography variant="h3" gutterBottom sx={{ width: 600 }} >{city.title}</Typography>
        </Item>
        <Item>
          <Typography variant="h3" gutterBottom sx={{ width: 1000 }} >{city.subtitle}</Typography>
        </Item>
        <Item>
          <Typography variant="h3" gutterBottom sx={{ width: 600 }} >{city.price}</Typography>
        </Item>
        <Item>
          <Typography variant="h4" gutterBottom sx={{ width: 1200 }} >{city.text}</Typography>
        </Item>
      </Stack>
    </Box>}
    </>
  );
}