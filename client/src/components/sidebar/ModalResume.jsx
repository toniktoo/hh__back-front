import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenModalResume } from '../../redux/actions/utils';

import { Button, Modal } from 'antd';
import { ListResume } from './ListResume';

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ModalResume = () => {
  const dispatch = useDispatch();
  const { isOpenModalResume } = useSelector((state) => state.reducerUtils);
  const { accessToken, resume } = useSelector((state) => state.reducerAuth);

  const handleSubmit = async () => {
    await toggleSettings();
  };

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
