import { Snackbar } from "@material-ui/core"
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


export interface MaterialSnackbarProps {
  message: string;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent) => void
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const MaterialSnackbar = (props: MaterialSnackbarProps) => {
  return (
    <>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="success">
          {props.message}
        </Alert>
      </Snackbar>
    </>
  )
}