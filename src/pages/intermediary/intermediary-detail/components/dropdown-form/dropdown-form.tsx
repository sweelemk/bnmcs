import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import { DropdownFormInterface, DropdownType } from '../../interfaces/dropdown.interface';
import { useDropdownForm } from '../../hooks/useDropdownForm';

const DropdownForm: React.FC<DropdownFormInterface> = ({ state, handleDropdown, handleDropdownState }) => {
  const {
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
  } = useDropdownForm(state, handleDropdown, handleDropdownState);

  return (
    <>
      <Row justify='end' style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Button type='primary' onClick={showModal}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <Table dataSource={state} pagination={false}>
            <Table.Column title='Options' dataIndex='option' key='option' />
            <Table.Column title='Value' dataIndex='value' key='value' />
            <Table.Column
              title='Action'
              key='action'
              render={(_: any, record: DropdownType) => (
                <Space size='middle'>
                  <Button type='link' onClick={() => onEdit(record.id)}>Edit</Button>
                  <Button type='link' onClick={() => showConfirmModal(record.id)}>Delete</Button>
                </Space>
              )}
            />
          </Table>
        </Col>
        <Modal
          title='Add new field'
          visible={isModalVisible}
          onOk={createNewField}
          onCancel={handleCancelCreateModal}
          okText={isEditMode.current ? 'Save' : 'Add'}
        >
          <Form form={form}>
            <Form.Item
              label='Option'
              name='option'
            >
              <Input value={dropdownState.option} onChange={handleOptionChange} />
            </Form.Item>
            <Form.Item
              label='Value'
              name='value'
            >
              <Input type='number' min={0} step={0.1} value={dropdownState.value} onChange={handleValueChange} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='Deleting'
          visible={visible}
          onOk={handleDeleteField}
          onCancel={handleCancelDeleteModal}
        >
          <p>Are you sure you want to delete the field?</p>
        </Modal>
      </Row>
    </>
  );
};

export default DropdownForm;
