import { createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import DevicesIcon from '@material-ui/icons/Devices';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    }
  })
);
export const SideMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <List>
      <Link to="/" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DevicesIcon />
          </ListItemIcon>
          <ListItemText primary="デバイス" />
        </ListItem>
      </Link>
    </List>
  )
}
