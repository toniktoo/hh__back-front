import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { setUserActiveResume } from '../../redux/actions/auth';
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
  padding: 8px;
  background-color: ${({ isActive }) => (isActive ? '#f9fafb' : null)};

  &:hover {
    background-color: #e4e6ef;
  }
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
  const { activeResume } = useSelector((state) => state.reducerAuth);
  const dispatch = useDispatch();

  const handleChangeActiveResume = (currentResume) => {
    dispatch(setUserActiveResume({ activeResume: currentResume }));
  };

  return (
    <Wrapper>
      <List>
        {resume.map((item) => (
          <Item
            key={item.id}
            isActive={activeResume.id === item.id}
            onClick={() => handleChangeActiveResume(item)}
          >
            <Info>
              <Avatar shape="circle" src={item.photo['100']} size="large" />
              <Title>{item.title}</Title>
            </Info>
            <Checkbox checked={activeResume.id === item.id} />
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};
