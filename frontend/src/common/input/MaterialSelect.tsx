import { FormControl, MenuItem, Select } from "@material-ui/core"
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

export class Item {
  constructor(
    public readonly value: any,
    public readonly text: string
  ) {}
}
export interface MaterialSelectProps {
  items: Item[];
  handleChange:(event: React.ChangeEvent<{ value: unknown }>) => void
}

const useStyles = makeStyles({
  select: {
    width: 140,
  },
});

export const MaterialSelect = (props: MaterialSelectProps) => {
  const classes = useStyles();
  const [age] = useState('');

  const menuItems = props.items.map(item => <MenuItem value={item.value}>{item.text}</MenuItem>)


  return (
    <FormControl>
      <Select
        className={classes.select}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={props.handleChange}
        value={age}
      >
        <MenuItem value="">
          <em>すべて</em>
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  )
}