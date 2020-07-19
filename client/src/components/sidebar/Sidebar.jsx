import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenModalSearch } from '../../redux/actions/utils';

const Wrapper = styled.div`
  border-radius: 5px;
  width: 250px;
`;
const ButtonSearch = styled.button`
  width: 100%;
  height: 30px;
  background-color: #1890ff;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #1890ffe8;
  }
`;
const Information = styled.div`
  padding: 8px;
`;
const Title = styled.h3``;
const List = styled.ul`
  margin: 0;
`;
const Item = styled.li`
  font-weight: 500;
`;
const ItemBase = styled.span``;
const ItemResponse = styled.span`
  margin-left: 6px;
`;

const ButtonResume = styled.button`
  width: 100%;
  height: 30px;
  background-color: #1890ff;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #1890ffe8;
  }
`;

export const Sidebar = () => {
  const { snippetVacancies } = useSelector((state) => state.reducerJobs);
  const { city, experience } = useSelector((state) => state.reducerUserInfo);
  const dispatch = useDispatch();

  const validateExperience = (experience) => {
    switch (experience) {
      case 1:
        return 'Не имеет значения';
      case 2:
        return 'Нет опыта';
      case 3:
        return 'От 1 года до 3 лет';
      case 4:
        return 'От 3 до 6 лет';
      default:
        return 'Не имеет значения';
    }
  };

  return (
    <Wrapper>
      <ButtonSearch
        onClick={() =>
          dispatch(setIsOpenModalSearch({ isOpenModalSearch: true }))
        }
      >
        Поиск
      </ButtonSearch>
      <Information>
        <Title>Информация поиска:</Title>
        <List>
          <Item>
            <ItemBase>Найдено вакансий:</ItemBase>
            <ItemResponse>{snippetVacancies.found}</ItemResponse>
          </Item>
          <Item>
            <ItemBase>Город:</ItemBase>
            <ItemResponse>{city.title}</ItemResponse>
          </Item>
          <Item>
            <ItemBase>Опыт:</ItemBase>
            <ItemResponse>{validateExperience(experience)}</ItemResponse>
          </Item>
        </List>
      </Information>
      <ButtonResume>Выбрать резюме</ButtonResume>
      <Information>
        <Title>Активное резюме:</Title>
        <List>
          <Item>
            <ItemBase>Fronted react, js</ItemBase>
          </Item>
        </List>
      </Information>
    </Wrapper>
  );
};
