import { PropTypes } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface MaterialButtonProps {
  text: string;
  color: PropTypes.Color;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';

  onClick: () => void
}

export const MaterialButton = (props: MaterialButtonProps) => {
  const onClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick();
  };

  return (
    <Button
      variant={props.variant}
      fullWidth={props.fullWidth}
      color={props.color}
      onClick={onClick}
    >
      {props.text}
    </Button>
  )
}