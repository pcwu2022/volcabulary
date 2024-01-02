import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';

const Login = () => {
  return (
    <div>
      <TextField id="username" label="Enter Your Username" variant="filled"/>
      <Button variant="contained">Submit</Button>
    </div>
  )
}

export default Login;
