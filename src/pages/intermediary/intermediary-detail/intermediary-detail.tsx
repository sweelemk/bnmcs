import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form, Input, Select, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntermediary } from './hooks/useIntermediary';
import { DropdownForm } from './components';
import './intermediary-detail.scss';
import { createIntermediary, getIntermediaryById, updateIntermediary } from '../../../api/services';
import { PageSpin } from '../../../views/page-spin';
import axios from 'axios';
import { notification } from '../../../helpers/notifications';

const TYPE_OPTIONS: string[] = ['range', 'dropdown'];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const dropdownLayout = {
  wrapperCol: { offset: 6, span: 16 }
};

const IntermediaryDetail:React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {
    defaultState,
    state,
    setState,
    resetState,
    handleNameChange,
    handleTypeChange,
    handleOrderChange,
    handleFromChange,
    handleToChange,
    handleRangeChange,
    handleDropdown,
    handleDropdownState
  } = useIntermediary();

  const getItem = async (id: string) => {
    setLoading(true);
    try {
      const data = await getIntermediaryById(id);
      setState(data);
      form.setFieldsValue(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        notification({ type: 'error', title: 'Something went wrong', description: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getItem(params.id);
    }
  }, []);

  const onCreate = async () => {
    const data = {
      ...state,
      id: uuidv4(),
      date: new Date()
    };
    setLoading(true);
    try {
      await createIntermediary(data);
      navigate('../intermediary', { replace: true });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        notification({ type: 'error', title: 'Something went wrong', description: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async () => {
    setLoading(true);
    try {
      await updateIntermediary(state);
      navigate('../intermediary', { replace: true });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        notification({ type: 'error', title: 'Something went wrong', description: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const onCancel = useCallback(() => {
    form.resetFields();
    resetState();
    navigate('../intermediary', { replace: true });
  }, []);

  return (
    <PageSpin spinning={isLoading}>
      <div className='container'>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          autoComplete='off'
          onFinish={params.id ? onUpdate : onCreate}
          initialValues={defaultState}
        >
          <Form.Item
            label='Name'
            name='name'
          >
            <Input value={state.name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label='Order'
            name='order'
          >
            <Input type='number' min={0} value={state.order} onChange={handleOrderChange} />
          </Form.Item>
          <Form.Item
            label='Type'
            name='type'
          >
            <Select disabled={!!params.id} value={state.type} onChange={handleTypeChange}>
              {
                TYPE_OPTIONS.map(type => (
                  <Select.Option key={type} value={type}>{type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='From'
            name='from'
            hidden={state.type !== 'range'}
          >
            <Input
              type='number'
              min={0}
              max={state.to}
              step={state.step}
              value={state.from}
              onChange={handleFromChange}
            />
          </Form.Item>
          <Form.Item
            label='To'
            name='to'
            hidden={state.type !== 'range'}
          >
            <Input type='number' min={0} step={state.step} value={state.to} onChange={handleToChange} />
          </Form.Item>
          <Form.Item
            label='Step'
            name='step'
            hidden={state.type !== 'range'}
          >
            <Input type='number' min={0} step={0.01} value={state.step} onChange={handleRangeChange} />
          </Form.Item>
          <Form.Item {...dropdownLayout}>
            {
              state.type === 'dropdown' ? (
                <DropdownForm
                  state={state.dropdownForm}
                  handleDropdown={handleDropdown}
                  handleDropdownState={handleDropdownState}
                />
              ) : null
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type='primary' htmlType='submit'>
                {params.id ? 'Save' : 'Submit'}
              </Button>
              <Button htmlType='button' onClick={onCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </PageSpin>
  );
};
export default IntermediaryDetail;
