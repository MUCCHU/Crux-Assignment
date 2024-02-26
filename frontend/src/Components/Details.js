import React from 'react';
import { Modal, Box, Typography, Grid, TableRow, TableCell, Avatar,  Link, Button, Table} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


function Details(props) {
    const profile = props.profile;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
        border: 'none'
      };
  return (<>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    width='100%'
  >
    <Box sx={style}>
    <Avatar sx={{ bgcolor: '#F2F4F7', color: '#667085' }}>{profile.description.candidate_name[0]}</Avatar>
    <Typography sx={{marginTop: '10px'}}>{profile.description.candidate_name}</Typography>
    <Typography variant='subtitle1' sx={{fontSize: '0.8rem'}} >{profile.description.email}</Typography>

    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="1" label="College" />
                            <Tab value="2" label="Project" />
                            <Tab value="3" label="Professional Experience" />
                        </Tabs>
                        </Box>
                        {value=='1' && <Table>
                            <TableRow>
                                <TableCell>Name:</TableCell>
                                <TableCell>{profile.description.candidate_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Branch:</TableCell>
                                <TableCell>{profile.description.college.branch}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Degree:</TableCell>
                                <TableCell>{profile.description.college.degree}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>CGPA:</TableCell>
                                <TableCell>{profile.description.college.cgpa}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Start:</TableCell>
                                <TableCell>{profile.description.college.start}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>End:</TableCell>
                                <TableCell>{profile.description.college.end}</TableCell>
                                </TableRow>
                        </Table>}

                    </Box>
                    </Modal>
                    <TableRow
                key={profile.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                    <Grid gap={2} container>
                        <Avatar sx={{ bgcolor: '#F2F4F7', color: '#667085' }}>{profile.description.candidate_name[0]}</Avatar>
                        <Grid item flexDirection='column'>
                            {profile.description.candidate_name} <br/>
                            {profile.description.email}
                        </Grid>

                  </Grid>
                </TableCell>
                <TableCell align="right">{profile.score}</TableCell>
                <TableCell align="right"><Link href={profile.link}>Link</Link></TableCell>
                <TableCell align="right"><Button variant="text">View Details</Button></TableCell>
              </TableRow>
  </>
  )
}

export default Details