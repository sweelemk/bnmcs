import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';
import { useNavigate } from 'react-router-dom';
import { deleteIntermediary, getIntermediary, IntermediaryItem } from '../../../api/services';
import { EmptyData, PageSpin } from '../../../views';
import { notification } from '../../../helpers/notifications';
import './intermediary-list.scss';

const Intermediary: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IntermediaryItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | undefined>('');

  const fetchData = async () => {
    try {
      const respData = await getIntermediary();
      setData(respData);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        notification({ type: 'error', title: 'Something went wrong', description: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteField = async (id: string) => {
    setLoading(true);
    try {
      await deleteIntermediary(id);
      setActiveId('');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        notification({ type: 'error', title: 'Something went wrong', description: e.message });
      }
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (id: string | undefined) => {
    setVisible(true);
    setActiveId(id);
  };

  const handleOkModal = () => {
    setVisible(false);
    activeId && deleteField(activeId);
  };

  const handleCancelModal = () => {
    setVisible(false);
    setActiveId(undefined);
  };

  const navigateToEdit = (id: string | undefined) => {
    navigate(`../intermediary/${ id }`);
  };

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
                      <Button type='link' onClick={() => navigateToEdit(record.id)}>Edit</Button>
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
