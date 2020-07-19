import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changeExperience } from '../../redux/actions/userInfo';
import { Radio } from 'antd';

const ButtonExperience = styled(Radio.Button)`
  width: calc(100% / 2);
  text-align: center;
`;

export const ComponentExperience = () => {
  const dispatch = useDispatch();
  const { experience } = useSelector((state) => state.reducerUserInfo);
  const onChangeExperience = (e) => {
    dispatch(changeExperience({ experience: e.target.value }));
  };
  return (
    <>
      <h2 style={{ margin: '0 16px 0 0' }}>Опыт:</h2>
      <Radio.Group
        onChange={onChangeExperience}
        value={experience}
        name="radiogroup"
        defaultValue={1}
        size="middle"
      >
        <ButtonExperience value={1}>Не имеет значения</ButtonExperience>
        <ButtonExperience value={2}>Нет опыта</ButtonExperience>
        <ButtonExperience value={3}>От 1 до 3 лет</ButtonExperience>
        <ButtonExperience value={4}>От 3 до 6 лет</ButtonExperience>
      </Radio.Group>
    </>
  );
};
