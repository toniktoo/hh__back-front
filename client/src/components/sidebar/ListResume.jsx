import React from 'react';
import styled from 'styled-components';
import { Avatar, Checkbox } from 'antd';

const Wrapper = styled.div``;
const List = styled.ul`
  padding: 0;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 16px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h2`
  margin: 0 0 0 16px;
`;

export const ListResume = ({ resume }) => {
  return (
    <Wrapper>
      <List>
        {resume.map((item) => (
          <Item key={item.id}>
            <Info>
              <Avatar shape="circle" src={item.photo['100']} size="large" />
              <Title>{item.title}</Title>
            </Info>
            <Checkbox />
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};
