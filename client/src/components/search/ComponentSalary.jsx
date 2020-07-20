import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changeSalary } from '../../redux/actions/userInfo';
import { Button, Input } from 'antd';

const InputWrapper = styled.div`
  width: 100%;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
`;

const InputForm = styled(Input)`
  max-width: 250px;
  width: 100%;
  background: none;
  color: #000;
  font-weight: 700;
`;

const Subtitle = styled.span`
  font-size: 13px;
`;

export const ComponentSalary = () => {
  const [isChangeSalary, setIsChangeSalary] = useState(false);

  const dispatch = useDispatch();
  const { salary } = useSelector((state) => state.reducerUserInfo);

  const handleChangeSalary = () => setIsChangeSalary(!isChangeSalary);

  const renderInfoSalary = () => {
    return (
      <>
        <h2 style={{ margin: 0 }}>
          Зарплата: {salary === null || salary === '' ? 'Не важно' : salary}
        </h2>
        <Button onClick={handleChangeSalary}>Изменить</Button>
      </>
    );
  };

  const renderChangeSalary = () => {
    return (
      <>
        <InputWrapper>
          <InputForm
            placeholder="Укажите ожидаемую зарплату"
            value={salary}
            onChange={(e) => dispatch(changeSalary({ salary: e.target.value }))}
          />
          <Subtitle>
            При указании значения будут найдены вакансии, в которых вилка
            зарплаты близка к указанной в запросе.
          </Subtitle>
        </InputWrapper>
        <Button onClick={handleChangeSalary}>Назад</Button>
      </>
    );
  };
  return <>{isChangeSalary ? renderChangeSalary() : renderInfoSalary()}</>;
};
