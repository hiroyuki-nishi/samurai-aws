import { Route, Redirect } from "react-router-dom";

export interface AuthenticateRouteProps {
  path: string
  children: any
}

export const AuthenticateRoute = (props: AuthenticateRouteProps) => {
  // TODO
  const token = localStorage.getItem('token'); 
  console.log(token);
  return token ? <Route path={props.path}>{props.children}</Route> : <Redirect to="/" />;
}