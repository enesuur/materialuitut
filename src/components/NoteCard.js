import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DeleteOutlined} from '@mui/icons-material';
import { makeStyles } from '@mui/styles'
import { Avatar, IconButton , Typography } from '@mui/material';
import { blue, green, pink, yellow } from '@mui/material/colors';

const avatarColor = {
  work: yellow[700],
  money: green[500],
  todos: pink[500],
}
const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if(note.category === 'work'){
        return yellow[700];
      }
      if(note.category === 'money'){
        return green[500];
      }
      if(note.category === 'todos'){
        return pink[500];
      }else{
        return blue[500]
      }
    }
  }
}
)


export default function CardItem({note, handleDelete}) {
  const classes = useStyles(note)
  return (
    <div>
        <Card elevation={2} >
          <CardHeader
              avatar= {
                <Avatar
                sx={{backgroundColor: avatarColor[note.category] || blue[500]}}

                >
                  {note.category[0].toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton onClick={() => handleDelete(note.id)}>
                  <DeleteOutlined/>
                </IconButton>
              }
              title={note.title}
              subheader={note.category}
           >
          </CardHeader>

          <CardContent>
            <Typography varince='body2'>
              {note.details}
            </Typography>
          </CardContent>
        </Card>
    </div>
  )
}
