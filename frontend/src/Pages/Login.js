import React from 'react';
import { Box, Container, Typography, TextField, Button, Link, Grid, IconButton } from '@mui/material';
import { loginUser } from '../Redux/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, Link as Lnk } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userToken = localStorage.getItem('userToken')
    let auth = useSelector(state => state.auth)
    useEffect(() => {
        // dispatch(loginUser({}))
        // if (userToken) {
        //     navigate('/')
        // }
    }, [])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = React.useState(false);

  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  

    const handleLogin = async (e) => {
        e.preventDefault()
        await dispatch(loginUser({ username, password }))
        setOpen(true);
        setTimeout(()=>{
         navigate('/upload')
        }, 1000)
        // setTimeout(() => {navigate('/')}, 2000)
    }
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                  <Snackbar anchorOrigin={{ vertical:"top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                        Login Successful! Redirecting ...
                    </Alert>
                </Snackbar>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h2" gutterBottom>Welcome to Crux</Typography>
                    <Typography paragraph>
                        Here, we believe that building a strong professional network begins with your participation.
                        We are delighted to offer a modern and user-friendly service to ensure you have the best experience.
                    </Typography>
                    <Lnk to="/register">
                    <Button variant="contained" color="primary">Join Now!</Button>
                    </Lnk>
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