import { Container, Grid, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router-dom";

import { MaterialProgress } from "../progress/MaterialProgress";
import { SideMenu } from "./Menu";


const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    // primary: { main: colors.pink[800] }, // テーマの色
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    subHeader: {
      minHeight: "36px"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    }
  })
);

export interface GenericTemplateProps {
  children: React.ReactNode;
  loading?: boolean;
  subHeader?: React.ReactNode;
  subHeaderLeft?: React.ReactNode;
}

export const GenericTemplate: React.FC<GenericTemplateProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const onLogout = () => history.push("/");

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title}></Typography>
            <IconButton color="inherit" onClick={handleClick} >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>アカウント設定</MenuItem>
              <MenuItem onClick={onLogout}>ログアウト</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <SideMenu />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <MaterialProgress visible={true} />
          <Toolbar className={classes.subHeader}>
            {props?.subHeaderLeft}
            <section className={classes.rightToolbar}>
              {props?.subHeader}
            </section>
          </Toolbar>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {props.children}
            </Grid>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};
