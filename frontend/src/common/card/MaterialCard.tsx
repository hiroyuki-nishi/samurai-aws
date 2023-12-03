import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
});

export interface MaterialCardProps {
  title?: string;
  content?: any; //TODO
  action?: any; //TODO
}

export const MaterialCard = (props: MaterialCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={props.title}/>
      <CardContent>
        {props.content}
      </CardContent>
      <CardActions>
        {props.action}
      </CardActions>
    </Card>
  );
}