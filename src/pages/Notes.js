import React, { useEffect } from 'react'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes,setNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/notes')
    .then((res) => res.json())
    .then((data)  => {setNotes(data)})
    .catch((error) => {console.log(error.message)})
  },[]);

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id,{
      method:'DELETE'
    })
    const newNotes = notes.filter(note =>  id != note.id )
    setNotes(newNotes);
  }

  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
      {notes.map((note) => (
        <div  key={note.id}> 
        <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
        </div>
      ))}
      </Masonry>
    </Container>
  )
}
