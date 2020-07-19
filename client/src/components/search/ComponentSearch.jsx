import React from 'react';
import styled from 'styled-components';

import { Input } from 'antd';

const Wrapper = styled.div`
  width: 100%;
`;

const InputForm = styled(Input)`
  width: 100%;
  background: none;
  color: #000;
  font-weight: 700;
`;

export const ComponentSearch = ({ textValue, setTextValue }) => {
  return (
    <Wrapper>
      <InputForm
        placeholder="Профессия, должность или компания"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </Wrapper>
  );
};
