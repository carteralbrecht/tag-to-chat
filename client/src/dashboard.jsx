import React, { Component } from "react";
import { Button, IconButton, Typography, Slide, Modal, Dialog, AppBar, Toolbar, MuiThemeProvider, CssBaseline} from "@material-ui/core";
import { createMuiTheme, withStyles} from "@material-ui/core/styles";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FaceIcon from "@material-ui/icons/Face";
import SearchIcon from "@material-ui/icons/Search";
import { withOktaAuth } from '@okta/okta-react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = theme => ({
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
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const top = 50;
    const left = 50;

    this.modalStyle = {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    }

    this.state = {
      openChat: false,
      openProfile: false
    }

    this.handleOpenProfile = this.handleOpenProfile.bind(this);
    this.handleCloseProfile = this.handleCloseProfile.bind(this);
    this.handleOpenChat = this.handleOpenChat.bind(this);
    this.handleCloseChat = this.handleCloseChat.bind(this);
  }

  handleOpenProfile() {
    this.setState({ openProfile: true });
  }

  handleCloseProfile() {
    this.setState({ openProfile: false });
  }

  handleOpenChat() {
    this.setState({ openChat: true });
  }

  handleCloseChat() {
    this.setState({ openChat: false });
  }

  render() {
    const { classes } = this.props;

    // Controls the theme of the page itself behind all elements
    const pageTheme = createMuiTheme({
      palette: {
        background: {
          default: "#303030" // darker grey color for background
        }
      }
    });

    // styling for the body of the profile modal
    const profileBody = (
      <div style={this.modalStyle} className={classes.profileModal}>
        <FaceIcon style={{fontSize: 40}} />
        <h1 id="nickname">Nickname</h1>
        <h1 id="email">Email </h1>
        <h1 id="password" type="password"> Password </h1>
      </div>
    );

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
          edge="end"
          display="inline"
          onClick={this.handleOpenProfile}
        >
          <FaceIcon display="inline" style={{ fontSize: 50 }} />
        </IconButton>
        <Modal
          open={this.state.openProfile}
          onClose={this.handleCloseProfile}
          label="profileModal"
        >
          {profileBody}
        </Modal>
  
        <IconButton
          className={classes.searchButton}
          edge="end"
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
          <CardActionArea onClick={this.handleOpenChat}>
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
          open={this.state.openChat}
          onClose={this.handleCloseChat}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="end" color="inherit" onClick={this.handleCloseChat}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default withOktaAuth(withStyles(useStyles)(Dashboard));