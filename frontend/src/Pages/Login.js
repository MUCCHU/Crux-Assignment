import React from 'react';
import { Box, Container, Typography, TextField, Button, Link, Grid, IconButton } from '@mui/material';
import { loginUser } from '../Redux/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userToken = localStorage.getItem('userToken')
    useEffect(() => {
        // dispatch(loginUser({}))
        if (userToken) {
            navigate('/')
        }
    }, [])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()
        await dispatch(loginUser({ username, password }))
        navigate('/')
    }
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h2" gutterBottom>Welcome to Crux</Typography>
                    <Typography paragraph>
                        Here, we believe that building a strong professional network begins with your participation.
                        We are delighted to offer a modern and user-friendly service to ensure you have the best experience.
                    </Typography>
                    <Button variant="contained" color="primary">Join Now!</Button>
                    {/* Include your illustration here */}
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="h5" gutterBottom>Sign in</Typography>
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        <Link href="#" variant="body2">
                            Recover Password?
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign in
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}