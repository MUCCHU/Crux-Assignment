import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Avatar, Link, Button, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';


// Dummy data for the sake of example
const recommendedProfiles = [
  { initials: 'PS', name: 'Prabhat Singh', email: 'olivia@untitledui.com', score: 100, link: '#' },
  // ... other recommended profiles
];

const nonRecommendedProfiles = [
  { initials: 'CW', name: 'Candice Wu', email: 'candice@gmail.com', score: 69, link: '#' },
  // ... other non-recommended profiles
];

const FilteredResumes = () => {
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
            {recommendedProfiles.map((profile) => (
              <TableRow
                key={profile.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                    <Grid gap={2} container>
                        <Avatar sx={{ bgcolor: blue[500] }}>{profile.initials}</Avatar>
                        <Grid item flexDirection='column'>
                            {profile.name}
                            {profile.email}
                        </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">{profile.score}</TableCell>
                <TableCell align="right"><Link href={profile.link}>Link</Link></TableCell>
                <TableCell align="right"><Button variant="text">View Details</Button></TableCell>
              </TableRow>
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