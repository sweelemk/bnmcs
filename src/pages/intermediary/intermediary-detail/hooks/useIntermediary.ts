import React, { useState } from 'react';
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

export const useIntermediary = () => {
  // TODO it is necessary to re-work all handlers to one.
  const [state, setState] = useState<IntermediaryItem>(defaultState);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      name: e.target.value
    });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      order: +e.target.value
    });
  };

  const handleTypeChange = (e: IntermediaryType) => {
    setState({
      ...state,
      type: e
    });
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      from: +e.target.value
    });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      to: +e.target.value
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      step: +e.target.value
    });
  };

  const handleDropdown = (dropdownState: DropdownType) => {
    setState({
      ...state,
      dropdownForm: [
        ...state.dropdownForm,
        dropdownState
      ]
    });
  };

  const handleDropdownState = (dropdownState: DropdownType[]) => {
    setState({
      ...state,
      dropdownForm: dropdownState
    });
  };

  const resetState = () => {
    setState(defaultState);
  };

  return {
    state,
    setState,
    resetState,
    defaultState,
    handleNameChange,
    handleOrderChange,
    handleTypeChange,
    handleFromChange,
    handleToChange,
    handleRangeChange,
    handleDropdown,
    handleDropdownState
  };
};
