import React from 'react';
import { Box, Container, Typography, TextField, Button, Link, Grid, IconButton } from '@mui/material';
import { registerUser } from '../Redux/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as LinkR } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userToken = localStorage.getItem('userToken')
    useEffect(() => {
        // dispatch(loginUser({}))
        if (userToken) {
            navigate('/')
        }
    }, [])
    const [type, setType] = useState('candidate')
    const handleChange = (event, newType) => {
        setType(newType);
      };
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = async (e) => {
        e.preventDefault()
        await dispatch(registerUser({ username, firstname, lastname, email, password, type }))
        navigate('/')
    }
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h2" gutterBottom>Welcome to Crux</Typography>
                    <Typography paragraph>
                        Here, we believe that building a strong professional network begins with your participation.
                        We are delighted to offer a modern and user-friendly service to ensure you have the best experience.
                    </Typography>
                    <Typography paragraph>
                      Already have an account?
                    </Typography>
                    <LinkR to="/login">
                    <Button variant="contained" color="primary">Sign In!</Button>
                    </LinkR>
                    {/* Include your illustration here */}
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="h5" gutterBottom>Sign Up</Typography>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={5}>
                                  <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="firstname"
                                  label="firstname"
                                  name="firstname"
                                  autoComplete="firstname"
                                  autoFocus
                                  value = {firstname}
                                  onChange = {(e) => setFirstname(e.target.value)}
                                    />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="lastname"
                                  label="lastname"
                                  name="lastname"
                                  autoComplete="lastname"
                                  autoFocus
                                  value = {lastname}
                                  onChange = {(e) => setLastname(e.target.value)}
                                    />
                            </Grid>
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                        />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                        />
                        
                        <Typography sx={{marginTop: '20px'}} paragraph>Register as</Typography>
                          <ToggleButtonGroup
                              color="primary"
                              value={type}
                              exclusive
                              onChange={handleChange}
                              aria-label="Platform"
                              sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}
                            >
                            <ToggleButton sx={{flexGrow: 1}} value="candidate">Candidate</ToggleButton>
                            <ToggleButton sx={{flexGrow: 1}} value="recruiter">Recruiter</ToggleButton>
                            </ToggleButtonGroup>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Join Now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}