import axios from "axios";
import type {AxiosRequestConfig} from "axios";

export type Response<T> = {
  readonly data?: T,
  readonly status?: number
};
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> {
  try {
    const response = await axios.get<T>(`${url}`, config);
    return {
      data: response.data,
      status: response.status
    };
  } catch (e) {
    return e;
  }
}
