import { barcelona, roma, paris, londres } from './info'
import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
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
    {city && <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>

    }
    </>
  );
}
