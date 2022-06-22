import { http } from '../http';
import { AxiosResponse } from 'axios';

export type IntermediaryItem = {
  id: string;
  date: string;
  name: string[];
  order: number;
};

export const getIntermediary = async (): Promise<AxiosResponse> => http.get<IntermediaryItem[]>('/intermediaries');
// eslint-disable-next-line max-len
export const createIntermediary = async (intermediary: IntermediaryItem): Promise<AxiosResponse> => http.post<IntermediaryItem>('/intermediaries', intermediary);
// eslint-disable-next-line max-len
export const updateIntermediary = async (intermediary: IntermediaryItem): Promise<AxiosResponse> => http.put<IntermediaryItem>('/intermediaries', intermediary);
// eslint-disable-next-line max-len
export const deleteIntermediary = async (intermediary: IntermediaryItem): Promise<AxiosResponse> => http.delete<IntermediaryItem>(`/intermediaries/${ intermediary.id }`);
