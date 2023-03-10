import {  AddCircleOutlineOutlined, SubjectOutlined, ThreeMp } from '@mui/icons-material';
import { Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {  red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {format} from 'date-fns'
const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page:{
            width:'100%',
            background: '#f9f9f9',
            padding: theme.spacing(3)
        },
        drawer : {
            width: drawerWidth,
    
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            backgroundColor:red
        },
        title : {
            padding: theme.spacing(3)
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        avatar: {
            marginLeft:theme.spacing(2)
        }
    }
});
export default function Layout({children}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary'/>,
            path: '/',
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color='secondary'/>,
            path: '/create',
        }
        
    ]
    return (
    <div className={classes.root}>
        <AppBar 
        sx = {{width: `calc(100% - ${drawerWidth}px)`}}
        elevation={1}>
            <Toolbar>
                <Typography
                sx={{flexGrow:1}}
                >
                    Today is the {format(new Date(),'do MMMM Y')}
                </Typography>
                <Typography>
                    Mario
                </Typography>
                <Avatar src='/mario-av.png' className={classes.avatar}></Avatar>
            </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{paper: classes.drawerPaper}}
        >
            <Typography 
            variant='h5'
            className={classes.title}
            >
                Ninja Notes
            </Typography>

        <List>
            {menuItems.map((item) => (
                <ListItem 
                key={item.text}
                button
                onClick={() => {history.push(item.path)}}
                className={location.pathname == item.path ?  classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.text}</ListItemText>
                </ListItem>
            ))}
        </List>
        </Drawer>

        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div>
    </div>
  )
}
