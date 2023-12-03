import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export interface Props {
  formName: string;
  fullWidth?: boolean;
  inputProps?: { maxLength: number, pattern?: string }
  label: string;
  changeValue: (formName: string, value: string) => void
  /**
   * 1. エラー表示を追加
   * 2. スタイルを追加
   */
}

export const MaterialInputPassowrd = (props: Props) => {
  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    props.changeValue(props.formName, event.target.value);
  }

  const handleClickShowPassword = () => 
    setValues({ ...values, showPassword: !values.showPassword });

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="standard-adornment-password">{props.label}</InputLabel>
      <Input
        id="standard-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        inputProps={props?.inputProps}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}