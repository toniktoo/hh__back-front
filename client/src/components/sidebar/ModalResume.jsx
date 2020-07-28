import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenModalResume } from '../../redux/actions/utils';

import { Button, Modal } from 'antd';
import { ListResume } from './ListResume';

export const ModalResume = () => {
  const dispatch = useDispatch();
  const { isOpenModalResume } = useSelector((state) => state.reducerUtils);
  const { resume } = useSelector((state) => state.reducerAuth);

  const toggleSettings = () => {
    dispatch(setIsOpenModalResume({ isOpenModalResume: false }));
  };

  return (
    <>
      <Modal
        title="Ваши резюме"
        visible={isOpenModalResume}
        centered={true}
        onCancel={toggleSettings}
        footer={[
          <Button key="back" onClick={toggleSettings}>
            Назад
          </Button>,
        ]}
      >
        {resume ? (
          <ListResume resume={resume.items} />
        ) : (
          'Вам нужно авторизироваться, что бы видеть ваши резюме.'
        )}
      </Modal>
    </>
  );
};
