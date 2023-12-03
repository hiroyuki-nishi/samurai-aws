import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MaterialButton } from '../common/button/MaterialButton';
import { MaterialCard } from '../common/card/MaterialCard';
import { MaterialInput } from '../common/input/MaterialInput';
import { MaterialInputPassowrd } from '../common/input/MaterialInputPassoword';
import { LoginRequest } from '../common/model/LoginModel';
import { MaterialProgress } from '../common/progress/MaterialProgress';
import { LoginService } from '../common/service/LoginService';


const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    center: {
      transform: 'translateY(85%)'
    },
  })
)

export const Login: () => JSX.Element = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const history = useHistory();
  const loginService = new LoginService()
  const FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password',
  }

  // TODO
  localStorage.clear();

  const formChange = (formName: string, value: string) => {
    switch (formName) {
      case FORM_KEYS.EMAIL:
        setEmail(value);
        break;
      case FORM_KEYS.PASSWORD:
        setPassword(value);
        break;
      default:
        console.log('key not found');
    }
  };

  const onLogin = () => 
    loginService.login(new LoginRequest(email, passowrd))
      .then((response) =>  console.log(response.data))
      .catch((error: AxiosError) => {
        console.log(error)
        moveLogin()
      })

  const moveLogin = () => {
    // TODO
    localStorage.setItem("token", "true");
    history.push('/device');
  }

  return (
    <>
      <div className={classes.center}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={8}>
          <MaterialProgress visible={false} />
          <MaterialCard
            content={
              <form noValidate autoComplete="off">
                <div>
                  <MaterialInput
                    formName={FORM_KEYS.EMAIL}
                    fullWidth={true}
                    inputProps={{ maxLength: 128 }}
                    label="email"
                    variant="standard"
                    changeValue={formChange}
                  />
                </div>
                <div>
                  <MaterialInputPassowrd
                    formName={FORM_KEYS.EMAIL}
                    fullWidth={true}
                    inputProps={{ maxLength: 16 }}
                    label="password"
                    changeValue={formChange}
                  />
                </div>
                <div>
                  <MaterialButton text="ログイン" color="primary" fullWidth={true} variant="contained" onClick={onLogin} />
                </div>
              </form>
            }
          />
        </Grid>
      </Grid>
      </div>
    </>
  );
}