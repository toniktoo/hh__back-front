import React from 'react';
import styled from 'styled-components';

import { Alert } from 'antd';

const Wrapper = styled.div`
  width: calc(100vw - 298px);
  height: calc(100% - 100px);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: #fff;
`;
const AlertWrapper = styled(Alert)`
  max-width: 300px;
  width: 100%;
`;

export const AlertCustom = ({ isShow, text }) => {
  if (isShow) {
    return (
      <Wrapper>
        <AlertWrapper message={text} type="success" showIcon />
      </Wrapper>
    );
  }
  return null;
};
