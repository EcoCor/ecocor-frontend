import axios, {
  AxiosRequestConfig,
  Method,
  CancelTokenSource,
  AxiosResponse,
} from 'axios';
import { CorpusData, Text, Entity } from './types';

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

export async function getCorpusTexts(
  corpusName: string
): Promise<AxiosResponse<Text[]>> {
  const url = `${apiUrl}/corpora/${corpusName}/texts`;
  return await fetchData<Text[]>(url);
}

export async function getCorpusEntities(
  corpusName: string
): Promise<AxiosResponse<Entity[]>> {
  const url = `${apiUrl}/corpora/${corpusName}/entities`;
  return await fetchData<Entity[]>(url);
}

export async function getText(
  corpusName: string,
  textName: string
): Promise<AxiosResponse<Text>> {
  const url = `${apiUrl}/corpora/${corpusName}/texts/${textName}`;
  return await fetchData<Text>(url);
}
