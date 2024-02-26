import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Avatar, Link, Button, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import client from '../api';
import Details from '../Components/Details';
import CircularProgress from '@mui/material/CircularProgress';


const FilteredResumes = () => {
  const { jobid } = useParams();
  const userToken = localStorage.getItem('userToken');
  const [profiles, setProfiles] = useState([
  ]);
  const [loading, setLoading] = useState(true);
  const getFilteredResumes = async () => {
    try{
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }
      const { data } = await client.post('/api/score/', {
        job_id: jobid
      } ,config)
      // iterate on all values of data and convert the description to json object
      data.forEach((profile) => {
        profile.description = JSON.parse(profile.description);
      })
      console.log(data);
      setProfiles(data);
    } catch(error){
      console.log("Could not fetch");
    }
  }
  useEffect(() => {
    getFilteredResumes();
  }, [])
  return (
    <Box sx={{ overflow: 'hidden', marginTop: '80px', padding: '1rem 5rem 0 5rem' }}>
      <Typography variant="h5"  component="div">
        4 Resumes filtered
      </Typography>
      <Typography variant="subtitle1" color='grey' gutterBottom component="div">Purpose Selection </Typography>
     
      <Divider sx={{marginTop:' 20px', marginBottom: '20px'}} />
      <Typography variant="h6" gutterBottom>
        Recommended Profiles
      </Typography>
      <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Relevance Score</TableCell>
              <TableCell align="right">Resume Link</TableCell>
              <TableCell align="right"></TableCell> {/* Empty for the View Details Button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <Details profile={profile} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      {/* Non-Recommended Profiles */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Non-Recommended Profiles
      </Typography>
      {/* ... The table structure would be similar to the Recommended Profiles */}
    </Box>
  );
};

export default FilteredResumes;