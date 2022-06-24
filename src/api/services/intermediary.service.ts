import { http } from '../http';
import { AxiosResponse } from 'axios';
import { IntermediaryType } from '../../pages/intermediary/intermediary-detail/interfaces/intermediary-detail.interface';
import { DropdownType } from '../../pages/intermediary/intermediary-detail/interfaces/dropdown.interface';

export type IntermediaryItem = {
  id?: string;
  date: Date | number;
  name: string;
  order: number;
  type: IntermediaryType;
  from: number;
  to: number;
  step: number;
  dropdownForm: DropdownType[];
};

export const getIntermediary = async (): Promise<IntermediaryItem[]> => http
  .get<IntermediaryItem[]>('/intermediaries')
  .then(({ data }) => data);

export const createIntermediary = async (intermediary: IntermediaryItem): Promise<AxiosResponse> => http
  .post<IntermediaryItem>('/intermediaries', intermediary);

export const updateIntermediary = async (intermediary: IntermediaryItem): Promise<AxiosResponse> => http
  .put<IntermediaryItem>(`/intermediaries/${ intermediary.id }`, intermediary);

export const deleteIntermediary = async (id: string): Promise<AxiosResponse> => http
  .delete<IntermediaryItem>(`/intermediaries/${ id }`);

export const getIntermediaryById = async (id: string): Promise<IntermediaryItem> => http
  .get<IntermediaryItem[]>(`/intermediaries?id=${ id }`)
  .then(({ data }) => data[0]);
