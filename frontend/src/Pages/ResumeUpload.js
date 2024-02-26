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
import pdficon from '../Images/pdf.svg'

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


export default function ResumeUpload() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const [visible, setVisible] = React.useState(false);
  const userToken = localStorage.getItem('userToken');
  const resumes = [
    {name: 'resume7.pdf', size:'24.7 KBs'},
    {name: 'resume8.pdf', size:'41.0 KBs'},
    {name: 'resume9.pdf', size:'34.5 KBs'},
    {name: 'resume10.pdf', size:'28.1 KBs'},
  ];
  const handleUpload = async (e) => {
    const formData = new FormData();
    acceptedFiles.forEach((file, index)=>{
      formData.append(`resume`, file);
    })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`,
      },
    }
    try{
      const response = await client.post('/api/upload/', formData, config);
      console.log(response);
      setVisible(true);
    }catch(error){
      console.log("Could not upload");
    
  }}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', marginTop: '90px' }}>
        <Grid item xs={12} md={6}>
          <UploadBox variant="outlined" {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant="h6">Click to upload PDF or drag and drop</Typography>
            <ul style={{listStyleType: 'none'}}>
            {acceptedFiles.map((file) => (
              <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
            ))}
            </ul>
            <UploadIcon />
            
          </UploadBox>
          <Grid container sx={{ marginTop: '2rem'}} gap={2} justifyContent="center">
            <Button sx={{padding: '10px'}} variant="outlined">Cancel</Button>
            <StyledButton variant="contained" onClick={(e)=> {handleUpload(e)}} component="span"> Attach files </StyledButton>
          </Grid>
          {visible && resumes.map((resu)=>(<Box sx={{border: '1px solid #EAECF0', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
            <Grid container>
              <Grid>
              <img src={pdficon} alt="pdf" style={{width:'35px', display: 'block', margin: 'auto'}} />
              </Grid>
              <Grid sx={{marginLeft: '20px'}}>
                <div style={{fontWeight: '400'}}>
              {resu.name}
                </div>
                <div style={{color:'#475467'}}>
                {resu.size}-100% uploaded
                </div>
              </Grid>
            </Grid>
          </Box>))}
        </Grid>
      </Grid>
    </Box>
  );
}