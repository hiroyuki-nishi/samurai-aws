import { TextField } from '@material-ui/core';


interface MaterialInputProps {
  formName: string;
  fullWidth?: boolean;
  inputProps?: { maxLength: number, pattern?: string }
  label: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  changeValue: (formName: string, value: string) => void
  /**
   * 1. エラー表示を追加
   * 2. スタイルを追加
   */
}

export const MaterialInput = (props: MaterialInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeValue(props.formName, event.target.value);
  };

  return (<TextField
    fullWidth={props?.fullWidth}
    inputProps={props?.inputProps}
    label={props.label}
    variant={props.variant}
    onChange={handleChange}
  />)
 };