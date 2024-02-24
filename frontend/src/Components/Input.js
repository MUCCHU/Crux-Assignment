import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

function Input(props) {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
      props.onChange(e.target.value)
    }
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
          border: '1px solid',
          borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
          fontSize: 16,
          width: 'auto',
          padding: '10px 12px',
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ]),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }));
      
  return (
    <FormControl variant="standard">
        <InputLabel sx={{fontSize: '1.2rem !important'}} shrink htmlFor="bootstrap-input">
            {props.label}
        </InputLabel>
        <BootstrapInput value={props.value} onChange={handleChange} id="bootstrap-input" />
  </FormControl>
  )
}

export default Input