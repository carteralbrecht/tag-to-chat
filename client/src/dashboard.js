import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import { ListItemText, ListItem, List } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import FaceIcon from "@material-ui/icons/Face";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    // Styles for each appended card
    minWidth: 275,
    maxWidth: 10,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  // Style for the name of the chat on the card
  chatName: {
    color: "default"
  },
  chatDescription: {
    color: "black",
    fontSize: 15
  },
  appBar: {
    position: "relative"
  },
  appBarTitle: {
    marginLeft: theme.spacing(3),
    flex: 1
  },
  dashboardText: {
    display: "flex",
    align: "center",
    margin: "auto",
    flexGrow: 1,
    justifyContent: "center",
    color: "white"
  },
  profileButton: {
    // styles for the profile button that will take the user to a profile modal
    color: "white",
    marginTop: theme.spacing(-12)
  },
  searchButton: {
    // Styles for the search button that will redirect to explore page
    color: "white",
    marginTop: theme.spacing(-12)
  },
  logOutButton: {
    // Styles for logout button
    color: "whitesmoke",
    marginTop: theme.spacing(-12),
    fontSize: 30,
    backgroundColor: "grey",
    marginLeft: theme.spacing(190),
    alignSelf: "right",
    flex: 1,
    justifyContent: "right"
  },
  profileModal: {
    position: "absolute",
    width: 400,
    backgroundColor: "grey",
    border: "2px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
    marginTop: theme.spacing(-20)
  }
}));

// Controls the theme of the page itself behind all elements
const pageTheme = createMuiTheme({
  palette: {
    background: {
      default: "#303030" // darker grey color for background
    }
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// function that returns style of modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function Dashboard() {
  // Attributing styles to their classes definted up top
  const classes = useStyles();

  // state variable for opening chat window
  const [open, setOpen] = React.useState(false);

  // state variable for opening profile modal
  const [openProfileWindow, setOpenProfile] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  // Functions for opening and closing a chat window
  const openChat = () => {
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
  };

  // Functions to open profile modal
  const openProfile = () => {
    setOpenProfile(true);
  };

  const closeProfile = () => {
    setOpenProfile(false);
  };

  // styling for the body of the profile modal
  const profileBody = (
    <div style={modalStyle} className={classes.profileModal}>
      <FaceIcon style={{fontSize: 40}} />
      <h1 id="nickname">Nickname</h1>
      <h1 id="email">Email </h1>
      <h1 id="password" type="password"> Password </h1>
    </div>
  );

  // Render the dashboard page
  return (
    <MuiThemeProvider theme={pageTheme}>
      <CssBaseline />

      <Typography
        display="inline"
        name="DashboardText"
        variant="h2"
        className={classes.dashboardText}
      >
        Dashboard
      </Typography>

      <IconButton
        className={classes.profileButton}
        edge="right"
        display="inline"
        onClick={openProfile}
      >
        <FaceIcon display="inline" style={{ fontSize: 50 }} />
      </IconButton>
      <Modal
        open={openProfileWindow}
        onClose={closeProfile}
        label="profileModal"
      >
        {profileBody}
      </Modal>

      <IconButton
        className={classes.searchButton}
        edge="right"
        display="inline"
      >
        <SearchIcon display="inline" style={{ fontSize: 50 }} />
      </IconButton>

      <Button className={classes.logOutButton}>Log Out</Button>

      <Card
        variant="outlined"
        className={classes.root}
        style={{
          borderColor: "#7567C4",
          backgroundColor: "grey",
          borderWidth: "8px"
        }}
      >
        <CardActionArea onClick={openChat}>
          <CardContent>
            <Typography variant="h6" className={classes.chatName}>
              Chat Name
            </Typography>
            <Typography variant="h6" className={classes.chatDescription}>
              Example description for a chat that a user can open by clicking on
              the card
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={closeChat}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="right" color="inherit" onClick={closeChat}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<Dashboard />, document.querySelector("#dashboard"));
