import { LinearProgress } from "@material-ui/core"


export interface MaterialProgressProps {
  color?: 'primary' | 'secondary';
  visible: boolean;
}

export const MaterialProgress = (props: MaterialProgressProps) => {

  return (
    <>
      {props.visible ? <LinearProgress color={props.color ? props.color : "secondary"} /> : null}
    </>
  )
}