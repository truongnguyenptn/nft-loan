import { AxiosResponse } from 'axios';
import request from './request';

export const finalizeRequest = async ({
  id
}: any): Promise<AxiosResponse<any>> => {
  return await request.post<any>(`/request/finalize-request/{id}`);
};

export const sendRequest = async ({
  assetId,
  owner
}: any): Promise<AxiosResponse<any>> => {

  const payload = {
    assetId: 'F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk',
    owner: 'CbSKdjmeR8ursxzJHXqk6sQJjQUCCC1sof6NLtABoTC4'
  }
  return await request.post<any>(`/request`, payload);
};

export const getAllRequest = async ({
  id = 1
}: any): Promise<AxiosResponse<any>> => {
  return await request.get<any>(`/offer/${id}`);
};