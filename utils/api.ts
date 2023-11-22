import axios, { type AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';
import { fileHeader } from '@/helpers/axiosHeaders';

const BASE_URL = import.meta.env.VITE_APP_API_PATH;

axios.defaults.withCredentials = true;

function axiosConfigFile() {
  return {
      withCredentials: true,
      paramsSerializer(paramsToSerialize: Params) {
          return qs.stringify(paramsToSerialize, { arrayFormat: 'repeat' });
      },
      headers: { ...fileHeader },
  };
}

function handleApiError(error: AxiosError) {
  if (error.response) {
    // eslint-disable-next-line
    console.error('API Error:', error.response.status, error.response.data);
  } else {
    // eslint-disable-next-line
    console.error('Network Error:', error.message);
  }
}
export async function get<T>(url: string, data?: any): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axios.get(`${BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return undefined;
  }
}

export async function post<T>(url: string, data?: any): Promise<T | undefined> {
  const response: AxiosResponse<T> = await axios.post(`${BASE_URL}/${url}`, data);
  return response.data;
}

export async function postFile<T>(url: string, data: any) {
  try {
    const response: AxiosResponse<T> = await axios.post(`${BASE_URL}/${url}`, data, axiosConfigFile());
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return undefined;
  }
}
export async function deleteItem<T>(url: string) {
  const response: AxiosResponse<T> = await axios.delete(`${BASE_URL}/${url}`);
  return response.data;
};

interface Params {
    [key: string]: any;
}
