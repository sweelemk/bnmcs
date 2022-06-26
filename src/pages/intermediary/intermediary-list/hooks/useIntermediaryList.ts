import { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteIntermediary, getIntermediary, IntermediaryItem } from '../../../../api/services';
import { notification } from '../../../../helpers/notifications';

type useIntermediaryListType = {
  data: IntermediaryItem[],
  isLoading: boolean,
  visible: boolean,
  showModal: (id: string | undefined) => void,
  handleOkModal: () => void,
  handleCancelModal: () => void
};
export const useIntermediaryList = (): useIntermediaryListType => {
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

  return {
    data,
    isLoading,
    visible,
    showModal,
    handleOkModal,
    handleCancelModal
  };
};
