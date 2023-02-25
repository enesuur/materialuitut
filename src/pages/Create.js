// Makes an object destruction it has slightly less performance than other way.
// import { Typography } from '@mui/material'
// import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography'
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useState } from 'react'
import { TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';
import { useHistory } from 'react-router-dom';


const field =  {
  marginTop: 5,
  marginBottom:5,
  display:'block'
}
export default function Create() {
  // Variant componentin hangi HTML elemanına karşılık geleceğine karar verir.
  // Color Text'in rengini ayarlar. HEX vs. değerler girilmez sadece Theme rengi üzerinden.
  // align Text'in componentte nasıl hizalancağını ayarlar.
  // Nowrap textin ekrana sığmayan(horizantal or vertical) kısmını 3 nokta ile sonladırır.Snippet için gayet faydalı.
  // glutterBottom  Bottom Margin vermeyi sağlar.
  const history = useHistory();
  const [title,setTitle] = useState('');
  const [details,setDetails] = useState('');
  const [titleError,setTitleError] = useState(false);
  const [detailsError,setDetailsError] = useState(false);
  const [category,setCategory] = useState('todos');
  function handleSubmit(e){
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if(!title){
      setTitleError(true);
    }

    if(!details){
      setDetailsError(true);
    }
    if(title && details){
      fetch('http://localhost:8000/notes', {
        method:'POST',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({title,details,category})
      }).then(() => {history.push('/')})
    }

  }
  
  return (
    <Container>
      <Typography
        variant='h2'
        color='textSecondary'
        component='h6'
        gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete='off'>
        <TextField
          onChange={(e) => {setTitle(e.target.value)}}
          sx={field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        >
        </TextField>

        <TextField
          onChange={(e) => {setDetails(e.target.value)}}
          sx={field}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        >
        </TextField>
      <FormControl sx={field}>
        <FormLabel>Category</FormLabel>
        <RadioGroup value={category} onChange={(e) => {setCategory(e.target.value)}}>
          <FormControlLabel value='money' control={<Radio/>} label='Money'/>
          <FormControlLabel value='todos' control={<Radio/>} label='todos'/>
          <FormControlLabel value='reminders' control={<Radio/>} label='reminders'/>
          <FormControlLabel value='work' control={<Radio/>} label='work'/>
        </RadioGroup>
      </FormControl>
      <Button
      onClick={handleSubmit}
      type='submit'
      color='secondary'
      variant='contained'
      endIcon={<KeyboardArrowRightIcon/>}
      >
        Submit
      </Button>
      </form>

      {/* <AbcIcon color='secondary' fontSize='large'/>
      <AbcIcon color='secondary' fontSize='small'/>
      <AbcIcon color='action' fontSize='large'/>
      <AbcIcon color='error' fontSize='large'/> */}
      {/* <ButtonGroup
        color='secondary'
        variant='contained'
        onClick={() =>{console.log('You clicked!')}}
      >
        <Button >1</Button>
        <Button>2</Button>
        <Button>3</Button>
       </ButtonGroup> */}
    </Container>
  )
}
