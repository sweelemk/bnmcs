import React, { useRef, useState } from 'react';
import { DropdownType } from '../interfaces/dropdown.interface';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';

const defaultState: DropdownType = {
  id: '',
  option: '',
  value: 0
};

export const useDropdownForm = (
  state: DropdownType[],
  handleDropdown: (state: DropdownType) => void,
  handleDropdownState: (state: DropdownType[]) => void
) => {
  const [form] = Form.useForm();
  const isEditMode = useRef<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [dropdownState, setDropdownState] = useState<DropdownType>(defaultState);
  const [activeId, setActiveId] = useState<string | undefined>('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showConfirmModal = (id: string | undefined) => {
    setVisible(true);
    setActiveId(id);
  };

  const createNewField = () => {
    setIsModalVisible(false);
    if (isEditMode.current) {
      const newState = state.map(stateItem => (stateItem.id === activeId ? {
        ...stateItem,
        ...{
          option: dropdownState.option,
          value: dropdownState.value
        }
      } : stateItem));
      handleDropdownState(newState);
    } else {
      handleDropdown({
        ...dropdownState,
        id: uuidv4()
      });
    }

    form.resetFields();
    setDropdownState(defaultState);
    isEditMode.current = false;
  };

  const handleCancelCreateModal = () => {
    setIsModalVisible(false);
    isEditMode.current = false;
    form.resetFields();
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownState({
      ...dropdownState,
      option: e.target.value
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownState({
      ...dropdownState,
      value: +e.target.value
    });
  };

  const onDeleteField = (id: string) => {
    const newState = state.filter(stateItem => stateItem.id !== id);
    handleDropdownState(newState);
  };

  const onEdit = (id: string) => {
    const item = state.find(stateItem => stateItem.id === id);
    isEditMode.current = true;
    showModal();
    form.setFieldsValue(item);
    setActiveId(id);
    item && setDropdownState(item);
  };

  const handleDeleteField = () => {
    setVisible(false);
    activeId && onDeleteField(activeId);
  };

  const handleCancelDeleteModal = () => {
    setVisible(false);
    setActiveId(undefined);
  };

  return {
    dropdownState,
    form,
    visible,
    isModalVisible,
    isEditMode,
    showModal,
    showConfirmModal,
    createNewField,
    handleCancelCreateModal,
    handleOptionChange,
    handleValueChange,
    onEdit,
    handleDeleteField,
    handleCancelDeleteModal
  };
};
