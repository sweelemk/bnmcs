import React, { Dispatch, SetStateAction, useState } from 'react';
import { IntermediaryType } from '../interfaces/intermediary-detail.interface';
import { DropdownType } from '../interfaces/dropdown.interface';
import { IntermediaryItem } from '../../../../api/services';

const defaultState: IntermediaryItem = {
  date: 0,
  name: '',
  order: 0,
  type: 'range',
  from: 0,
  to: 0,
  step: 0.01,
  dropdownForm: []
};

type useIntermediaryType = {
  state: IntermediaryItem,
  setState: Dispatch<SetStateAction<IntermediaryItem>>,
  resetState: () => void,
  defaultState: IntermediaryItem,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleTypeChange: (e: IntermediaryType) => void,
  handleDropdown: (dropdownState: DropdownType) => void,
  handleDropdownState: (dropdownState: DropdownType[]) => void,
};

export const useIntermediaryHandlers = (): useIntermediaryType => {
  const [state, setState] = useState<IntermediaryItem>(defaultState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleTypeChange = (e: IntermediaryType): void => {
    setState({
      ...state,
      type: e
    });
  };

  const handleDropdown = (dropdownState: DropdownType): void => {
    setState({
      ...state,
      dropdownForm: [
        ...state.dropdownForm,
        dropdownState
      ]
    });
  };

  const handleDropdownState = (dropdownState: DropdownType[]): void => {
    setState({
      ...state,
      dropdownForm: dropdownState
    });
  };

  const resetState = (): void => {
    setState(defaultState);
  };

  return {
    state,
    setState,
    resetState,
    defaultState,
    handleInputChange,
    handleTypeChange,
    handleDropdown,
    handleDropdownState
  };
};
