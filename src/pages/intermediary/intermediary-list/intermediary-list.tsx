import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Space, Table } from 'antd';
import { formatInTimeZone } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';
import { useIntermediaryList } from './hooks/useIntermediaryList';
import { IntermediaryItem } from '../../../api/services';
import { EmptyData, PageSpin } from '../../../views';
import './intermediary-list.scss';

const Intermediary: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    visible,
    showModal,
    handleOkModal,
    handleCancelModal
  } = useIntermediaryList();

  return (
    <PageSpin spinning={isLoading}>
      <div className='container-header'>
        <Button type='primary' onClick={() => navigate('../intermediary/add')}>Add</Button>
      </div>
      <div className='container'>
        {
          !data?.length ? <EmptyData /> : (
            <div>
              <Table dataSource={data} pagination={false}>
                <Table.Column
                  title='Created at'
                  dataIndex='date'
                  key='date'
                  render={(_:any, record: IntermediaryItem) => {
                    const formatDate = formatInTimeZone(record.date, 'Europe/Paris', 'd LLL yyyy HH:mm zzz', { locale: enGB });
                    return (
                      <span>{formatDate}</span>
                    );
                  }}
                />
                <Table.Column title='Name' dataIndex='name' key='name' />
                <Table.Column title='Order' dataIndex='order' key='order' />
                <Table.Column
                  title='Action'
                  key='action'
                  render={(_: any, record: IntermediaryItem) => (
                    <Space size='middle'>
                      <Button type='link' onClick={() => navigate(`../intermediary/${ record.id }`)}>Edit</Button>
                      <Button type='link' onClick={() => showModal(record.id)}>Delete</Button>
                    </Space>
                  )}
                />
              </Table>
            </div>
          )
        }
      </div>
      <Modal
        title='Deleting'
        visible={visible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
        okText='Ok'
        cancelText='Cancel'
      >
        <p>Are you sure you want to delete the field?</p>
      </Modal>
    </PageSpin>
  );
};

export default Intermediary;
