import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export interface DialogProps {
 actions?: React.ReactNode;
 content?: React.ReactNode;
 open: boolean
 title: string;
 close: () => void 
}

export const FullScreanDialog = (props: DialogProps) => {

  return (
    <div>
      <Dialog
        open={props.open ? true : false}
        onClose={props.close}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
          {props?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            {props?.actions}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}