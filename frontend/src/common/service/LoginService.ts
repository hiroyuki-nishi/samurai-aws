import axios, { AxiosResponse } from 'axios';
import { ILoginResponse, LoginRequest } from "../model/LoginModel";


export class LoginService {
  login(request: LoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    console.log(request);
    return axios.get<ILoginResponse>('http://localhost:9999/login')
  }
}

