import React, {useEffect, useState} from 'react';
import { Grid, Paper, Box, Typography, Button, Modal, TextField, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import client from '../api'

function Jobs() {
    const userToken = localStorage.getItem('userToken')
    const [open, setOpen] = React.useState(false);
    const [snackopen, setsnackopen] = useState(false);
    const handlesnackClose = ()=> setsnackopen(false);
    const [jobs, setJobs] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCreate = async() =>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          }
            try{
           const {data} = await client.post('/api/jobs/', {
                title: title,
                description: desc,
                required_skills: skills
            })
            setsnackopen(true);
            handleClose();
            getJobs();
        }
        catch(error){
            console.log("Could not post");
            handleClose();
        }
    }
    const getJobs = async()=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          }
            try{
           const { data } = await client.get('/api/jobs/', config)
            console.log(data)
            setJobs(data);
        }
        catch(error){
            console.log("Could not fetch");
        }
    }
    
    useEffect(() => {
      getJobs();
    
    }, [])
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [skills, setSkills] = useState('');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
      };
  return (
    <Box sx={{ overflow: 'hidden', marginTop: '80px', padding: '1rem 5rem 1rem 5rem' }}>
                          <Snackbar anchorOrigin={{ vertical:"top", horizontal: "center" }} open={snackopen} autoHideDuration={6000} onClose={handlesnackClose}>
                    <Alert
                    onClose={handlesnackClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                        Job Added
                    </Alert>
                </Snackbar>
        <Grid justifyContent='center' sx={{marginBottom: '20px'}} container>
            <Button onClick={handleOpen} variant='outlined'> + Create New Job</Button>
        </Grid>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Post a New Job
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            name="title"
            autoComplete="title"
            autoFocus
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="skills"
            label="skills"
            name="skills"
            autoComplete="skills"
            autoFocus
            multiline
            minRows={2}
            value = {skills}
            onChange = {(e) => setSkills(e.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="desc"
            label="desc"
            name="desc"
            autoComplete="desc"
            autoFocus
            multiline
            minRows={3}
            value = {desc}
            onChange = {(e) => setDesc(e.target.value)}
        />
        <Grid container justifyContent="center">
        <Button fullWidth onClick={handleCreate} variant='contained'> Create </Button></Grid>
        </Box>
      </Modal>
        <Grid gap={3} justifyContent='space-evenly' container>
            {jobs.map((job, index)=>(
                <Grid key={index} xs={3}>
                    <Link to={`/job/${job.id}`} style={{textDecoration: 'none'}}>
                        <Paper sx={{padding: '20px'}} elevation={1} >
                            <Typography component="div" variant="h6">
                                {job.title}
                            </Typography>
                            <Typography variant="paragraph">{job.description}</Typography>

                        </Paper>
                    </Link>
                </Grid>)) }
            <Grid></Grid>
            <Grid></Grid>
            <Grid></Grid>
        </Grid>
    </Box>
  )
}

export default Jobs