import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Paper from '@mui/material/Paper';
import client from '../api';

const UploadBox = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(6),
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // margin: theme.spacing(2, 0),
}));

const UploadIcon = styled(CloudUploadIcon)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
  fontSize: 48,
}));


function ResumeUpload() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const userToken = localStorage.getItem('userToken')
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('resume', acceptedFiles[0]);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`,
      },
    }
    const response = await client.post('/api/upload/', formData, config);
    console.log(response);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <UploadBox variant="outlined" {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant="h6">Click to upload PDF or drag and drop</Typography>
            {acceptedFiles.map((file) => (
              <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
            ))}
            <UploadIcon />
            
          </UploadBox>
          <Grid container sx={{ marginTop: '2rem'}} gap={2} justifyContent="center">
            <Button sx={{padding: '10px'}} variant="outlined">Cancel</Button>
            <StyledButton variant="contained" onClick={(e)=> {handleUpload(e)}} component="span"> Attach files </StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResumeUpload;
