import React from 'react';
import styled from 'styled-components';

import { Spin } from 'antd';

const WrapperSpin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const DataIsLoaded = ({ children, isLoading }) => {
  if (isLoading)
    return (
      <WrapperSpin>
        <Spin size="large" />
      </WrapperSpin>
    );
  return children;
};
