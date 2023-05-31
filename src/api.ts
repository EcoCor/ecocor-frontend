import axios, {
  AxiosRequestConfig,
  Method,
  CancelTokenSource,
  AxiosResponse,
} from 'axios';
import { CorpusData, Work } from './types';

const apiUrl = process.env.REACT_APP_ECOCOR_API;

const defaultOpts: AxiosRequestConfig = {
  withCredentials: true,
};

async function fetchData<T>(
  url: string,
  options?: {
    data?: object;
    method?: Method;
    cancelTokenSource?: CancelTokenSource;
  }
): Promise<AxiosResponse<T>> {
  return await axios(url, {
    ...defaultOpts,
    data: options?.data,
    method: options?.method,
    cancelToken: options?.cancelTokenSource?.token,
  });
}

export async function getCorpora(): Promise<AxiosResponse<CorpusData[]>> {
  const url = `${apiUrl}/corpora`;
  return await fetchData<CorpusData[]>(url);
}

export async function getCorpus(
  name: string
): Promise<AxiosResponse<CorpusData>> {
  const url = `${apiUrl}/corpora/${name}`;
  return await fetchData<CorpusData>(url);
}

export async function getCorpusWorks(
  corpusName: string
): Promise<AxiosResponse<Work[]>> {
  const url = `${apiUrl}/corpora/${corpusName}/works`;
  return await fetchData<Work[]>(url);
}

export async function getWork(
  corpusName: string,
  workName: string
): Promise<AxiosResponse<Work>> {
  const url = `${apiUrl}/corpora/${corpusName}/works/${workName}`;
  return await fetchData<Work>(url);
}
